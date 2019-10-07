import glob from './glob'

interface Pattern {
  matcher: string
  count: number
}

describe('glob', () => {
  it('returns matching files', async () => {
    const patterns: Pattern[] = [
      {
        matcher: `${__dirname}/test/history.md`,
        count: 1,
      },
      {
        matcher: `${__dirname}/test/**/*.md`,
        count: 3,
      },
      {
        matcher: `${__dirname}/test/**/whatever.md`,
        count: 1,
      },
    ]

    await Promise.all(
      patterns.map(async (p, idx) => {
        const got = glob(p.matcher)

        try {
          expect(got.length).toEqual(p.count)
        } catch {
          throw new Error(`case ${idx}: expected ${p.count}, got ${got.length}, ${got}`)
        }
      }),
    )
  })
})
