import { Command, flags } from '@oclif/command'
import * as semver from 'semver'

import consts from '../common/consts'
import * as extract from '../common/extract'
import glob from '../common/glob'

export default class Show extends Command {
  static description = 'Show previous changes in the given section'

  static examples = [
    `$ vump show 0.1.0
## examples/CHANGES.md

- Feature: This is an example

## examples/services/a/CHANGES.md

${consts.noChanges}
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    only: flags.boolean({
      char: 'o',
      description: 'Only show the changes that are included in given version',
      default: false,
      required: false,
    }),
  }

  static args = [
    {
      name: 'version',
      required: true,
    },
  ]

  async run() {
    const { args, flags } = this.parse(Show)

    // Ensure the given name is correct.
    if (!semver.valid(args.version)) {
      this.error('Invalid version, you must pass the appropriate semver! e.g. 0.1.0')
      return
    }

    const targets = glob(consts.defaultMatcher)

    if (targets.length === 0) {
      this.log('Nothing found.')
      return
    }

    const outs: Section[] = []

    await Promise.all(
      targets.map(async (t) => {
        const got = await extract.fromFile(args.version, t)

        outs.push({
          target: extract.omit(t),
          messages: got,
        })
      }),
    )

    this.log('')

    outs.forEach((o) => {
      if (o.messages.length === 0) {
        if (flags.only) {
          return
        }

        this.log('##', o.target, '\n')
        this.log(consts.noChanges, consts.postLines)
        return
      }

      this.log('##', o.target, '\n')
      this.log(o.messages.join('\n'), consts.postLines)
    })
  }
}

interface Section {
  target: string
  messages: string[]
}
