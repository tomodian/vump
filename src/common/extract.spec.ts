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

describe('latest', () => {
  it('returns undefined on CHANGES.md without history', async () => {
    const got = await extract.latest(`${__dirname}/../../test/fixtures/no-release/CHANGES.md`)

    try {
      expect(got).toEqual(null)
    } catch {
      throw new Error(`should not come into this section, got ${got}`)
    }
  })

  it('returns expected version on CHANGES.md that has history', async () => {
    const got = await extract.latest(`${__dirname}/../../test/fixtures/long-history/CHANGES.md`)

    try {
      expect(got).toEqual('10.1.2')
    } catch {
      throw new Error(`should not come into this section, got ${got}`)
    }
  })
})

interface OmitPattern {
  expected: string
  test: string
}

describe('omit', () => {
  it('returns expected results', async () => {
    const pats: OmitPattern[] = [
      {
        expected: '/',
        test: 'CHANGES.md',
      },
      {
        expected: '/services',
        test: '/services/CHANGES.md',
      },
    ]

    pats.forEach((p, idx) => {
      const got = extract.omit(p.test)

      try {
        expect(got).toEqual(p.expected)
      } catch (err) {
        throw new Error(`case ${idx}: expected ${p.expected}, got ${got}, tried ${p.test}, error ${err}`)
      }
    })
  })
})
