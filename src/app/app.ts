import Server from '../interfaces/http/server'
import DatabaseManager from '../infra/database/manager'
import { AwilixContainer } from 'awilix'
import { Cradle } from '../container'

export default class Application {

  server: Server
  databaseManager: DatabaseManager

  constructor(cradle: Cradle) {
    this.databaseManager = cradle.databaseManager
    this.server = cradle.server
  }

  async start(container: AwilixContainer) {
    await this.databaseManager.connect()
    await this.server.start(container)
  }

}