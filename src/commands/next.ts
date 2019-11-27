import { Command, flags } from '@oclif/command'

import consts from '../common/consts'
import * as extract from '../common/extract'
import * as format from '../common/format'
import glob from '../common/glob'

export default class Next extends Command {
  static description = 'Show all changes in Next section'

  static examples = [
    `$ vump next

  ## examples/CHANGES.md
  - Feature: This is an example

  ## examples/services/a/CHANGES.md
  ${consts.noChanges}`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    format: flags.string({
      char: 'f',
      description: 'Specify output format',
      default: format.Output.markdown,
      multiple: false,
      options: [
        // List output options.
        format.Output.markdown,
        format.Output.slack,
      ],
      required: false,
    }),
    only: flags.boolean({
      char: 'o',
      description: 'Only show the changes that are included in given version',
      default: false,
      required: false,
    }),
  }

  static args = []

  async run() {
    const { flags } = this.parse(Next)

    const targets = glob(consts.defaultMatcher)

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

    // Sort by target name.
    outs.sort((a, b) => (a.target > b.target ? 1 : -1))

    outs.forEach((o) => {
      const header = format.header({
        format: flags.format as any,
        value: o.target,
      })

      if (o.messages.length === 0) {
        if (flags.only) {
          return
        }

        this.log(header, '\n')
        this.log(consts.noChanges, consts.postLines)
        return
      }

      this.log(header, '\n')
      this.log(o.messages.join('\n'), consts.postLines)
    })
  }
}

interface Section {
  target: string
  messages: string[]
}
