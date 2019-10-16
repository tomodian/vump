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

  describe('0.1.0', () => {
    const version = '0.1.0'

    test
      .stdout()
      .command(['show', version])
      .it('Feature should exist', (ctx) => {
        const count = ctx.stdout.split('Feature:').length - 1

        expect(count).toEqual(2)
      })

    test
      .stdout()
      .command(['show', version])
      .it('Minor should exist', (ctx) => {
        const count = ctx.stdout.split('Minor:').length - 1

        expect(count).toEqual(0)
      })
  })

  describe('non-existent 9.9.9', () => {
    const version = '9.9.9'

    test
      .stdout()
      .command(['show', version])
      .it('should not exist', (ctx) => {
        const count = ctx.stdout.split(version).length - 1

        expect(count).toEqual(0)
      })
  })
})

describe('without release', () => {
  beforeEach(() => {
    consts.defaultMatcher = relpath('no-release')
  })

  afterEach(() => {
    consts.defaultMatcher = originalDefaultMatcher
  })

  describe('0.1.0', () => {
    const version = '0.1.0'

    test
      .stdout()
      .command(['show', version])
      .it('should not exist', (ctx) => {
        const count = ctx.stdout.split('Feature:').length - 1

        expect(count).toEqual(0)
      })

    test
      .stdout()
      .command(['show', version])
      .it('should not exist', (ctx) => {
        const count = ctx.stdout.split('Minor:').length - 1

        expect(count).toEqual(0)
      })
  })
})
