import * as fs from 'fs'

import overwrite from './overwrite'

const sample = `
# CHANGES

## Next

- Feature: Must capture this line

## 0.1.0

- Feature: Whatever
`

describe('overwrite', () => {
  it('succeeds', async () => {
    const testfile = `${__dirname}/test/overwrite.success.${Date.now()}.log`
    await fs.writeFileSync(testfile, sample)

    const res = await overwrite('1.0.0', testfile)
    const got = fs.readFileSync(testfile)

    expect(res).toEqual(true)
    expect(got.includes('## Next')).toEqual(true)
    expect(got.includes('## 1.0.0')).toEqual(true)
  })

  it('fails with the invalid semver', async () => {
    const testfile = `${__dirname}/test/overwrite.fail.${Date.now()}.log`
    await fs.writeFileSync(testfile, sample)

    const res = await overwrite('broken!', testfile)

    expect(res).toEqual(false)
  })
})
