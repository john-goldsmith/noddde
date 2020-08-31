import { Logger } from 'pino'

import { Cradle } from '../../../container'
import { UpdateOperation } from '../manager'
import UserEntity, { UserAttributes } from '../../../domain/user'
import RepositoryManager from '../../../infra/database/repository-manager'

export default class UpdateUserOperation implements UpdateOperation<UserAttributes, UserEntity> {

  repositoryManager: RepositoryManager
  logger: Logger

  constructor(cradle: Cradle) {
    this.repositoryManager = cradle.repositoryManager
    this.logger = cradle.logger
  }

  async one(user: UserEntity, attributes: Partial<UserAttributes>): Promise<UserEntity | null> {
    const updatedUserDocument = await this.repositoryManager.mongoMongooseUsers.findByIdAndUpdate(user.id, attributes)
    if (updatedUserDocument) {
      const updatedUser = UserEntity.fromObject(updatedUserDocument.toObject({ virtuals: true }))
      this.logger.info({ updatedUser }, 'Successfully updated user')
      return updatedUser
    } else {
      return null
    }
  }

  async many(users: UserEntity[], attributes: Partial<UserAttributes>): Promise<UserEntity[]> {
    // const updatedUserDocuments = await this.repositoryManager.mongoMongooseUsers.updateMany(users, attributes)
    // const updatedUsers = updatedUserDocuments.map(updatedUserDocument => UserEntity.fromObject(updatedUserDocument.toObject({ virtuals: true })))
    // this.logger.info({ updatedUsers }, `Successfully updated ${updatedUsers.length} users`)
    // this.emit(this.events.USER_UPDATED, { user, updatedUser }) // TODO: This is cool, but doesn't work using the console interface
    // return updatedUsers
    return [
      new UserEntity({email: '', password: '', username: ''})
    ]
  }

}
