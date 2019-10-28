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

export const latest = async (path: string): Promise<string | null> => {
  if (!path || !fs.existsSync(path)) {
    return null
  }

  const got = await fs.readFileSync(path, 'utf8')

  const re = /^## \d+.\d+.\d+/m

  const matched = got
    .split('\n')
    .map((line) => {
      const m = line.match(re)

      if (!m) {
        return
      }

      return m[0]
    })
    .filter((res) => res)

  if (matched.length === 0) {
    return null
  }

  return matched[0]!.split('## ')[1] as string
}
