#!/usr/bin/env node
// Verifies, for the package in the current working directory, that:
//   1. `npm pack` produces a tarball containing only `dist/` + standard package metadata files
//   2. every subpath in package.json "exports" resolves to a real file inside that tarball
//
// Run from a package directory (e.g. `pnpm --filter @tfds/tokens verify-pack`).

import { execSync } from "child_process"
import { access, mkdir, mkdtemp, readdir, readFile, rm } from "fs/promises"
import { tmpdir } from "os"
import { join } from "path"

const ALLOWED_TOP_LEVEL_FILES = new Set(["package.json", "README.md", "LICENSE", "LICENSE.md", "CHANGELOG.md"])

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function resolveWildcardExport(packageDir, target) {
  const relative = target.replace(/^\.\//, "")
  const starIndex = relative.indexOf("*")
  const dirPart = relative.slice(0, starIndex)
  const suffix = relative.slice(starIndex + 1)
  const dirToCheck = join(packageDir, dirPart)

  if (!(await fileExists(dirToCheck))) {
    throw new Error(`Export target directory does not exist: ${dirToCheck}`)
  }

  const entries = await readdir(dirToCheck)
  const hasMatch = entries.some((entry) => entry.endsWith(suffix))

  if (!hasMatch) {
    throw new Error(`No file matching "*${suffix}" found in ${dirToCheck}`)
  }
}

async function resolveExport(packageDir, specifier, target) {
  if (typeof target !== "string") {
    throw new Error(`Unsupported export target for "${specifier}": expected a string`)
  }

  if (target.includes("*")) {
    await resolveWildcardExport(packageDir, target)
    return
  }

  const filePath = join(packageDir, target.replace(/^\.\//, ""))
  if (!(await fileExists(filePath))) {
    throw new Error(`Export "${specifier}" points to "${target}", which does not exist in the tarball`)
  }
}

async function main() {
  const pkgDir = process.cwd()
  const pkg = JSON.parse(await readFile(join(pkgDir, "package.json"), "utf-8"))

  console.log(`Verifying pack/exports for ${pkg.name}...`)

  const tmpRoot = await mkdtemp(join(tmpdir(), "verify-pack-"))

  try {
    const packOutput = execSync(`npm pack --json --pack-destination "${tmpRoot}"`, {
      cwd: pkgDir,
      encoding: "utf-8",
    })
    const [packInfo] = JSON.parse(packOutput)
    const tarballPath = join(tmpRoot, packInfo.filename)

    const offenders = packInfo.files
      .map((f) => f.path)
      .filter((path) => {
        const topLevel = path.split("/")[0]
        return topLevel !== "dist" && !ALLOWED_TOP_LEVEL_FILES.has(path)
      })

    if (offenders.length > 0) {
      throw new Error(`Tarball contains files outside dist/: ${offenders.join(", ")}`)
    }

    const extractDir = join(tmpRoot, "extracted")
    await mkdir(extractDir, { recursive: true })
    execSync(`tar -xf "${tarballPath}" -C "${extractDir}"`)
    const packageDir = join(extractDir, "package")

    const exportsField = pkg.exports ?? {}
    for (const [specifier, target] of Object.entries(exportsField)) {
      await resolveExport(packageDir, specifier, target)
    }

    console.log(`OK: tarball contains only dist/, and all ${Object.keys(exportsField).length} exports resolve.`)
  } finally {
    await rm(tmpRoot, { recursive: true, force: true })
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
