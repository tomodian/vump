import { test } from '@oclif/test'

import consts from '../common/consts'

let originalDefaultMatcher = consts.defaultMatcher

const relpath = (target: string) => `${__dirname}/../../test/fixtures/${target}/**/CHANGES.md`

describe('without updates', () => {
  beforeEach(() => {
    consts.defaultMatcher = relpath('no-updates')
  })

  afterEach(() => {
    consts.defaultMatcher = originalDefaultMatcher
  })

  test
    .stdout()
    .command(['list'])
    .it('matches', (ctx) => {
      const count = ctx.stdout.split('CHANGES.md').length - 1

      expect(count).toEqual(2)
    })
})

describe('without release', () => {
  beforeEach(() => {
    consts.defaultMatcher = relpath('no-release')
  })

  afterEach(() => {
    consts.defaultMatcher = originalDefaultMatcher
  })

  test
    .stdout()
    .command(['list'])
    .it('matches', (ctx) => {
      const count = ctx.stdout.split('CHANGES.md').length - 1

      expect(count).toEqual(1)
    })
})
