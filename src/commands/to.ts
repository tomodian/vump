import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import * as semver from 'semver'

import consts from '../common/consts'
import glob from '../common/glob'
import overwrite from '../common/overwrite'

export default class To extends Command {
  static description = 'Bump to the given version'

  static examples = ['$ vump to 0.1.0']

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'version',
      required: true,
    },
  ]

  async run() {
    const { args } = this.parse(To)

    // Ensure the given name is correct.
    if (!semver.valid(args.version)) {
      this.error('Invalid version, you must pass the appropriate semver! e.g. 0.1.0')
      return
    }

    const answer = await cli.confirm(`Are you really sure to bump Next sections to ${args.version}? (yes/no)`)

    if (!answer) {
      this.log('Cancelled')
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
        const got = await overwrite(args.version, t)

        outs.push({
          target: t,
          ok: got,
        })
      }),
    )

    this.log('')

    outs.forEach((o) => {
      this.log('##', o.target, '-->', o.ok ? '👍' : '❌')
    })
  }
}

interface Section {
  target: string
  ok: boolean
}
