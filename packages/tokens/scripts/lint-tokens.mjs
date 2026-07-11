import { validateTokenFiles } from "../build.js"

validateTokenFiles()
  .then(() => {
    console.log("Tokens OK: DTCG schema and aliases valid.")
  })
  .catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
