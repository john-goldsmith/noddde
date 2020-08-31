import { AwilixContainer } from 'awilix'
import { Logger } from 'pino'

import DatabaseManager from '../../../../infra/database/manager'
import { CommandDefinition, ActionData, Prompt } from '../index'
import UserOperationManager from '../../../../app/operations/users/manager'
import { prompt } from 'enquirer'

const command: CommandDefinition = {
  name: 'user:findOneAndUpdate',
  description: 'attemps to find a user based on the provided conditions and, if one and only one record is found, updates it with the provided values',
  options: [
    ['-i, --id <id>', 'ID of the user to find and update'],
    ['-u, --username <username>', 'Username of the user to find and update'],
    ['-e, --email <email>', 'Email of the user to find and update'],
    ['--new-username <username>', 'New username of the user'],
    ['--new-email <email>', 'New email of the user'],
    ['--dry-run', 'Find user but do not update']
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
        const users = await userOperationManager.findMany(optionsAndAnswers)
        if (users.length !== 1) {
          logger.warn('Did not find exactly one result; refusing to update')
          return
        }
        const user = users[0]
        const update = await prompt<any>([
          {
            type: 'input',
            name: 'email',
            message: 'New email:',
            initial: () => {}
          },
          {
            type: 'input',
            name: 'username',
            message: 'New username:',
            initial: () => {}
          },
          {
            type: 'confirm',
            name: 'continue',
            message: 'Continue with update?'
          }
        ])
        if (optionsAndAnswers.dryRun) {
          logger.warn('Dry run enabled; refusing to update')
          return
        }
        if (update.continue) await userOperationManager.updateOne(user, update)
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
