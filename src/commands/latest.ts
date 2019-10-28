import { Command, flags } from '@oclif/command'

import consts from '../common/consts'
import * as extract from '../common/extract'
import glob from '../common/glob'

export default class Latest extends Command {
  static description = 'Show the latest version of CHANGES.md in the current directory'

  static examples = [
    `$ vump latest
0.1.0
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = []

  async run() {
    const targets = glob(`./${consts.file}`)

    if (targets.length === 0) {
      this.log(consts.messages.noChanges)
      return
    }

    const got = await extract.latest(targets[0])

    if (!got) {
      this.log(consts.messages.noChanges)
    }

    this.log(got!)
  }
}
