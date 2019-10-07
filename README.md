vump
====

CLI tool to manage your CHANGES.md, following semver.

[![Version](https://img.shields.io/npm/v/vump.svg)](https://npmjs.org/package/vump)
[![Downloads/week](https://img.shields.io/npm/dw/vump.svg)](https://npmjs.org/package/vump)
[![License](https://img.shields.io/npm/l/vump.svg)](https://github.com/tomodian/vump/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g vump
$ vump COMMAND
running command...
$ vump (-v|--version|version)
vump/0.1.0 darwin-x64 node-v8.10.0
$ vump --help [COMMAND]
USAGE
  $ vump COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`vump help [COMMAND]`](#vump-help-command)
* [`vump list`](#vump-list)
* [`vump next`](#vump-next)

## `vump help [COMMAND]`

display help for vump

```
USAGE
  $ vump help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `vump list`

list all the CHANGES.md

```
USAGE
  $ vump list

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ vump list
  examples/CHANGES.md
  examples/services/a/CHANGES.md
```

_See code: [src/commands/list.ts](https://github.com/tomodian/vump/blob/v0.1.0/src/commands/list.ts)_

## `vump next`

Show all changes in Next section

```
USAGE
  $ vump next

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ vump next
  ## examples/CHANGES.md

  - Feature: This is an example

  ## examples/services/a/CHANGES.md

  (no changes)
```

_See code: [src/commands/next.ts](https://github.com/tomodian/vump/blob/v0.1.0/src/commands/next.ts)_
<!-- commandsstop -->
