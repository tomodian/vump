import * as fs from 'fs'

/**
 * Given version and path, return the section.
 */
export const fromFile = async (version: string, path: string): Promise<string[]> => {
  if (!version || !path) {
    return []
  }

  const got = await fs.readFileSync(path, 'utf8')

  return fromString(version, got)
}

/**
 * Given version and Markdown body, return the section.
 */
export const fromString = async (version: string, markdown: string): Promise<string[]> => {
  if (!version || !markdown) {
    return []
  }

  // Define signals.
  const start = `## ${version}`
  const end = '##'

  const outs: string[] = []
  let started = false
  let done = false

  markdown.split('\n').forEach((line) => {
    if (done) {
      return
    }

    line = line.trim()

    if (!line) {
      return
    }

    if (line.startsWith(start)) {
      started = true
      return
    }

    if (!started) {
      return
    }

    if (line.startsWith(end)) {
      done = true
      return
    }

    outs.push(line)
  })

  return outs
}
