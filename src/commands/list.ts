import { Command, flags } from '@oclif/command'

import consts from '../common/consts'
import glob from '../common/glob'

export default class List extends Command {
  static description = 'Recursively list all the CHANGES.md'

  static examples = [
    `$ vump list
examples/CHANGES.md
examples/services/a/CHANGES.md
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = []

  async run() {
    const targets = glob(consts.defaultMatcher)

    if (targets.length === 0) {
      this.log(consts.messages.noChanges)
      return
    }

    this.log('Found:')
    this.log(targets.join('\n'))
  }
}
