import * as fs from 'fs'

import * as extract from './extract'

interface Pattern {
  path: string
  version: string
  count: number
}

const patterns: Pattern[] = [
  {
    path: 'test/init.md',
    version: 'Next',
    count: 1,
  },
  {
    path: 'test/history.md',
    version: 'Next',
    count: 2,
  },
  {
    path: 'test/history.md',
    version: '1.0.0',
    count: 2,
  },
  {
    path: 'test/history.md',
    version: '0.1.0',
    count: 1,
  },
]

describe('fromFile', () => {
  it('returns matching lines', async () => {
    await Promise.all(
      patterns.map(async (p, idx) => {
        const got = await extract.fromFile(p.version, `${__dirname}/${p.path}`)

        try {
          expect(got.length).toEqual(p.count)
        } catch {
          throw new Error(`case ${idx}: expected ${p.count}, got ${got.length}, ${got}`)
        }
      }),
    )
  })
})

describe('fromString', () => {
  it('returns matching lines', async () => {
    await Promise.all(
      patterns.map(async (p, idx) => {
        const sample = await fs.readFileSync(`${__dirname}/${p.path}`, 'utf8')
        const got = await extract.fromString(p.version, sample)

        try {
          expect(got.length).toEqual(p.count)
        } catch {
          throw new Error(`case ${idx}: expected ${p.count}, got ${got.length}, ${got}`)
        }
      }),
    )
  })
})
