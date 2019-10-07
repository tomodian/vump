import * as fs from 'fs'
import * as semver from 'semver'

import consts from './consts'

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
  const updated = original.replace(start, to)

  await fs.writeFileSync(path, updated)

  return true
}

export default overwrite
