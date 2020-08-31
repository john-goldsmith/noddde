import { AwilixContainer } from 'awilix'
import { CommanderStatic } from 'commander'

import exec from './exec'
import { CommandDefinition } from './index'

export default function addCommands(program: CommanderStatic, commandDefinitions: CommandDefinition[], container: AwilixContainer): void {
  for (const commandDefinition of commandDefinitions) {
    const { name, description, options } = commandDefinition
    const subProgram = program.command(name).passCommandToAction(false)
    const actionFn = exec(commandDefinition, container)
    subProgram.description(description)
    for (const option of options) {
      subProgram.option(option[0], option[1])
    }
    subProgram.action(actionFn)
  }
}
