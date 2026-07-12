export interface BundleManifest {
  dsVersions: Record<string, string>
  componentCount: number
  generatedAt: string
}

export function bundleData(options?: { repoRoot?: string; outDir?: string }): BundleManifest
