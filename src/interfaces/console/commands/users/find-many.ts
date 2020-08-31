import { AwilixContainer } from 'awilix'
import { Logger } from 'pino'

import DatabaseManager from '../../../../infra/database/manager'
import { CommandDefinition, ActionData, Prompt } from '../index'
import UserOperationManager from '../../../../app/operations/users/manager'

const command: CommandDefinition = {
  name: 'user:findMany',
  description: 'attemps to find all users based on the provided conditions',
  options: [
    ['-i, --id <id>', 'ID of the user to find'],
    ['-u, --username <username>', 'Username of the user to find'],
    ['-e, --email <email>', 'Email of the user to find']
  ],
  action: (container: AwilixContainer): ActionData => {
    const { databaseManager, logger, userOperationManager }: { databaseManager: DatabaseManager, logger: Logger, userOperationManager: UserOperationManager } = container.cradle

    const prompts: Prompt[] = [
      {
        type: 'input',
        name: 'id',
        message: 'ID:',
        initial: () => {}
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        initial: () => {}
      },
      {
        type: 'input',
        name: 'username',
        message: 'Username:',
        initial: () => {}
      }
    ]

    async function handler(optionsAndAnswers: any): Promise<void> {
      try {
        await userOperationManager.findMany(optionsAndAnswers)
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
