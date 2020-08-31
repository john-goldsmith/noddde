import program from 'commander'
import { Logger } from 'pino'
import { AwilixContainer } from 'awilix'

import config from '../../../../config/app'
import container from '../../../container'
import addCommands from './add-commands'
import userCommands from './users'
import DatabaseManager from '../../../infra/database/manager'
import logger from '../../../infra/logger'

// See https://github.com/enquirer/enquirer#prompt-options
export interface Prompt {
  type: string | (() => string)
  name: string // | (() => string)
  message: string | (() => string) | (() => Promise<string>)
  skip?: boolean | (() => boolean) | (() => Promise<boolean>)
  initial?: string | (() => any) | (() => Promise<any>)
  format?: () => any | Promise<any>
  result?: (answer: any) => any | Promise<any>
  validate?: (() => boolean) | (() => string) | (() => Promise<boolean>) | (() => Promise<string>)
}

export interface ActionData {
  databaseManager?: DatabaseManager
  logger?: Logger
  prompts: Array<Prompt>
  handler: (optionsAndAnswers: any) => Promise<void>
}

export interface CommandDefinition {
  name: string
  description: string
  options: string[][]
  action: (container: AwilixContainer) => ActionData
}

logger.info('Starting command line interface...')
addCommands(program, [
  ...userCommands
], container)

program
  .version(config.app.version, '-v, --version')
  .description('CLI commands for interacting with the app')
  .parse(process.argv)

if (!program.args.length) program.help()
