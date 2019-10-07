import * as fs from 'fs'
import * as semver from 'semver'

import consts from './consts'
import * as extract from './extract'

/**
 * Given version and path, bump (overwrite) the existing file.
 */
const overwrite = async (version: string, path: string): Promise<boolean> => {
  if (!version || !path) {
    return false
  }

  // Ensure the given name is correct.
  if (!semver.valid(version)) {
    return false
  }

  // Define signals.
  const start = `## ${consts.next}`
  const to = [`## ${consts.next}\n`, `## ${version}`].join('\n')

  const original = await fs.readFileSync(path, 'utf8')

  const diffs = await extract.fromString(consts.next, original)

  // Skip when there is no changes on Next section.
  if (diffs.length === 0) {
    return true
  }

  const updated = original.replace(start, to)

  await fs.writeFileSync(path, updated)

  return true
}

export default overwrite
