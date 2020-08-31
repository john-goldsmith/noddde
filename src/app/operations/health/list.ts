import { Logger } from 'pino'

import { Cradle } from '../../../container'
import DatabaseManager from '../../../infra/database/manager'

type HealthComponents = 'mongo'

export type HealthStatus = {
  [component in HealthComponents]: boolean
}

export default class ListHealthOperation {

  databaseManager: DatabaseManager
  logger: Logger

  constructor(cradle: Cradle) {
    this.databaseManager = cradle.databaseManager
    this.logger = cradle.logger
  }

  async exec(): Promise<HealthStatus> {
    return {
      mongo: this.databaseManager.mongoManager.mongoMongooseManager.connection.connection.readyState === 1
    }
  }

}
