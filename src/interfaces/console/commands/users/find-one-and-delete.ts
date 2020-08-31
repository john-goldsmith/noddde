import { AwilixContainer } from 'awilix'
import { Logger } from 'pino'

import DatabaseManager from '../../../../infra/database/manager'
import { CommandDefinition, ActionData, Prompt } from '../index'
import UserOperationManager from '../../../../app/operations/users/manager'
import { prompt } from 'enquirer'

const command: CommandDefinition = {
  name: 'user:findOneAndDelete',
  description: 'attemps to find a user based on the provided conditions and, if one and only one record is found, deletes it',
  options: [
    ['-i, --id <id>', 'ID of the user to find and delete'],
    ['-u, --username <username>', 'Username of the user to find and delete'],
    ['-e, --email <email>', 'Email of the user to find and delete'],
    ['--dry-run', 'Find user but do not delete']
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
          logger.warn('Did not find exactly one result; refusing to delete')
          return
        }
        const user = users[0]
        logger.info({ user })
        const confirm = await prompt<any>({
          type: 'confirm',
          name: 'continue',
          message: 'Delete?'
        })
        if (optionsAndAnswers.dryRun) {
          logger.warn('Dry run enabled; refusing to delete')
          return
        }
        if (confirm.continue) await userOperationManager.deleteOne(user)
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
