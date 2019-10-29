import * as format from './format'

interface HeaderPattern {
  input: format.HeaderInput
  expected: string
}

describe('format', () => {
  it('returns expected results', async () => {
    const pats: HeaderPattern[] = [
      {
        input: {
          format: format.Output.markdown,
          value: 'hello',
        },
        expected: '## hello',
      },
      {
        input: {
          format: format.Output.slack,
          value: 'hello',
        },
        expected: '*hello*',
      },
    ]

    pats.forEach((p, idx) => {
      const got = format.header(p.input)

      try {
        expect(got).toEqual(p.expected)
      } catch (err) {
        throw new Error(`case ${idx}: expected ${p.expected}, got ${got}, error ${err}`)
      }
    })
  })
})
