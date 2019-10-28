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
      this.log('Nothing found.')
      return
    }

    const outs: Section[] = []

    await Promise.all(
      targets.map(async (t) => {
        const got = await extract.fromFile(consts.next, t)

        outs.push({
          target: t,
          messages: got,
        })
      }),
    )

    this.log('')

    outs.forEach((o) => {
      this.log('##', o.target, '\n')

      if (o.messages.length === 0) {
        this.log(consts.noChanges, consts.postLines)
        return
      }

      this.log(o.messages.join('\n'), consts.postLines)
    })
  }
}

interface Section {
  target: string
  messages: string[]
}
