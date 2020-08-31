import { prompt } from 'enquirer'
import { CommandDefinition, Prompt } from './index'
import { AwilixContainer } from 'awilix'

export default function exec(commandDefinition: CommandDefinition, container: AwilixContainer): (options?: any) => Promise<void> {
  return async options => {
    const { logger } = container.cradle
    const { action } = commandDefinition
    const { databaseManager, prompts, handler } = action(container)

    if (databaseManager) {
      await databaseManager.connect()
    }

    let exitCode = 1

    try {
      // Exclude prompts that were passed in via command line options
      const filteredPrompts: Prompt[] = prompts.filter(prompt => !options[prompt.name])
      const answers = await prompt(filteredPrompts)
      const params = { ...options, ...answers } // Merge options and prompt answers
      const response = await handler(params)
      if (Boolean(response)) logger.info(response)
      exitCode = 0
    } catch (error) {
      logger.error(error)
    } finally {
      if (databaseManager) {
        await databaseManager.close()
      }
      logger.info('Exiting command line interface...')
      // process.exit(exitCode)
    }
  }
}
