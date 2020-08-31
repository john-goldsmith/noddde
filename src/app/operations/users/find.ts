import { Logger } from 'pino'

import { Cradle } from '../../../container'
import { FindOperation } from '../manager'
import UserEntity, { UserAttributes } from '../../../domain/user'
import RepositoryManager from '../../../infra/database/repository-manager'

export default class FindUserOperation implements FindOperation<UserAttributes, UserEntity> {

  repositoryManager: RepositoryManager
  logger: Logger

  constructor(cradle: Cradle) {
    this.repositoryManager = cradle.repositoryManager
    this.logger = cradle.logger
  }

  async one(conditions: Partial<UserAttributes>): Promise<UserEntity | null> {
    const userDocument = await this.repositoryManager.mongoMongooseUsers.findOne(conditions)
    if (!userDocument) {
      this.logger.info({ conditions }, 'No user found matching provided conditions')
      return null
    } else {
      const user = UserEntity.fromObject(userDocument.toObject({ virtuals: true }))
      this.logger.info({ conditions, user }, 'Found 1 user matching provided conditions')
      return user
    }
  }

  async many(conditions: Partial<UserAttributes>): Promise<UserEntity[]> {
    const userDocuments = await this.repositoryManager.mongoMongooseUsers.find(conditions)
    const users = userDocuments.map(userDocument => UserEntity.fromObject(userDocument.toObject({ virtuals: true })))
    this.logger.info({ conditions, users }, `Found ${users.length} user${users.length === 1 ? '' : 's'} matching provided conditions`)
    return users
  }

  async byId(id: string | number): Promise<UserEntity | null> {
    const userDocument = await this.repositoryManager.mongoMongooseUsers.findById(id)
    if (!userDocument) {
      this.logger.info({ id }, 'No user found matching provided ID')
      return null
    } else {
      this.logger.info({ id }, 'Found 1 user matching provided ID')
      const user = UserEntity.fromObject(userDocument.toObject({ virtuals: true }))
      return user
    }
  }

}
