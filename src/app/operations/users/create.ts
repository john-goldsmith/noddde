import { Logger } from 'pino'

import { Cradle } from '../../../container'
import { CreateOperation } from '../manager'
import UserEntity, { UserAttributes } from '../../../domain/user'
import RepositoryManager from '../../../infra/database/repository-manager'

export default class CreateUserOperation implements CreateOperation<UserAttributes, UserEntity> {

  repositoryManager: RepositoryManager
  // userOperationManager: UserOperationsManager
  logger: Logger

  constructor(cradle: Cradle) {
    this.repositoryManager = cradle.repositoryManager
    // this.userOperationManager = cradle.userOperationManager
    this.logger = cradle.logger
  }

  async one(attributes: UserAttributes): Promise<UserEntity> {
    const userDocument = await this.repositoryManager.mongoMongooseUsers.createOne(attributes)
    const user = UserEntity.fromObject(userDocument.toObject({ virtuals: true }))
    this.logger.info({ user, author: user.author() }, 'Successfully created 1 user')
    return user
  }

  async many(attributes: UserAttributes[]): Promise<UserEntity[]> {
    const userDocuments = await this.repositoryManager.mongoMongooseUsers.createMany(attributes)
    const users = userDocuments.map(userDocument => UserEntity.fromObject(userDocument.toObject({ virtuals: true })))
    this.logger.info({ users }, `Successfully created ${users.length} user${users.length === 1 ? '' : 's'}`)
    return users
  }

}
