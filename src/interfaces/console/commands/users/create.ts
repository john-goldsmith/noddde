import { AwilixContainer } from 'awilix'
import { Logger } from 'pino'

import DatabaseManager from '../../../../infra/database/manager'
import { CommandDefinition, ActionData, Prompt } from '../index'
import UserOperationManager from '../../../../app/operations/users/manager'
import { UserAttributes } from '../../../../domain/user'

const command: CommandDefinition = {
  name: 'user:create',
  description: 'create a new user',
  options: [
    ['-e, --email <email>', 'Set the user\'s email'],
    ['-u, --username <username>', 'Set the user\'s username'],
    ['--dry-run', 'Does not create user']
  ],
  action: (container: AwilixContainer): ActionData => {
    const { databaseManager, logger, userOperationManager }: { databaseManager: DatabaseManager, logger: Logger, userOperationManager: UserOperationManager } = container.cradle

    const prompts: Prompt[] = [
      {
        type: 'input',
        name: 'email',
        message: 'Email:'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:'
      },
      {
        type: 'input',
        name: 'username',
        message: 'Username:'
      }
    ]

    async function handler(optionsAndAnswers: any): Promise<void> {
      try {
        if (optionsAndAnswers.dryRun) {
          logger.warn('Dry run enabled; refusing to delete')
          return
        }
        await userOperationManager.createOne(optionsAndAnswers)
      } catch (error) {
        logger.error(error.message)
      }
    }

    return {
      databaseManager,
      prompts,
      handler
    }
  }
}

export default command
