import { Logger } from 'pino'

import { Cradle } from '../../../container'
import ListHealthOperation, { HealthStatus } from './list'

export default class HealthOperationsManager {

  private listHealthOperation: ListHealthOperation
  private logger: Logger

  constructor(cradle: Cradle) {
    this.logger = cradle.logger
    this.listHealthOperation = cradle.listHealthOperation
  }

  async list(): Promise<HealthStatus> {
    const health = await this.listHealthOperation.exec()
    return health
  }

}
