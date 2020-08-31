import { Logger } from 'pino'

import { Cradle } from '../../../container'
import { DeleteOperation } from '../manager'
import RepositoryManager from '../../../infra/database/repository-manager'
import UserEntity from '../../../domain/user'

export default class DeleteUserOperation implements DeleteOperation<UserEntity> {

  repositoryManager: RepositoryManager
  logger: Logger

  constructor(cradle: Cradle) {
    this.repositoryManager = cradle.repositoryManager
    this.logger = cradle.logger
  }

  async one(user: UserEntity): Promise<UserEntity | null> {
    const queryMetadata = await this.repositoryManager.mongoMongooseUsers.deleteOne(user.toJSON())
    this.logger.info({ user, queryMetadata }, 'Successfully deleted 1 user')
    return user
  }

  async many(users: UserEntity[]): Promise<UserEntity[]> {
    const queryMetadata = await this.repositoryManager.mongoMongooseUsers.deleteMany(users)
    this.logger.info({ users, queryMetadata }, `Successfully deleted ${users.length} users`)
    return users
  }

}
