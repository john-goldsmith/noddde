import { Logger } from 'pino'

import { Cradle } from '../../../container'
import CreateUserOperation from './create'
import DeleteUserOperation from './delete'
import FindUserOperation from './find'
import UpdateUserOperation from './update'
import UserEntity, { UserAttributes } from '../../../domain/user'

export default class UserOperationsManager {

  private createUserOperation: CreateUserOperation
  private deleteUserOperation: DeleteUserOperation
  private findUserOperation: FindUserOperation
  private updateUserOperation: UpdateUserOperation
  private logger: Logger

  constructor(cradle: Cradle) {
    this.logger = cradle.logger
    this.createUserOperation = cradle.createUserOperation
    this.deleteUserOperation = cradle.deleteUserOperation
    this.findUserOperation = cradle.findUserOperation
    this.updateUserOperation = cradle.updateUserOperation
  }

  async createOne(attributes: UserAttributes): Promise<UserEntity> {
    const user = await this.createUserOperation.one(attributes)
    return user
  }

  async createMany(attributes: UserAttributes[]): Promise<UserEntity[]> {
    const users = await this.createUserOperation.many(attributes)
    return users
  }

  async deleteOne(user: UserEntity): Promise<UserEntity | null> {
    const result = this.deleteUserOperation.one(user)
    return result
  }

  async deleteMany(users: UserEntity[]): Promise<UserEntity[]> {
    return this.deleteUserOperation.many(users)
  }

  async updateOne(user: UserEntity, attributes: Partial<UserAttributes>): Promise<UserEntity | null> {
    return this.updateUserOperation.one(user, attributes)
  }

  async updateMany(users: UserEntity[], attributes: Partial<UserAttributes>): Promise<UserEntity[]> {
    return this.updateUserOperation.many(users, attributes)
  }

  async findOne(conditions: Partial<UserAttributes>): Promise<UserEntity | null> {
    const result = await this.findUserOperation.one(conditions)
    return result
  }

  async findById(id: string | number): Promise<UserEntity | null> {
    const result = await this.findUserOperation.byId(id)
    return result
  }

  async findMany(conditions: Partial<UserAttributes>): Promise<UserEntity[]> {
    const { id, email, username } = conditions
    const users = await this.findUserOperation.many({ id, email, username })
    return users
  }

  async upsert(conditions: Partial<UserAttributes>): Promise<void> {}

  async findOneOrCreate(conditions: Partial<UserAttributes>): Promise<UserEntity> {
    return new UserEntity({email: '', password: '', username: '', id: '1'})
  }

  async findOneAndDelete(conditions: Partial<UserAttributes>): Promise<UserEntity | null> {
    const { id, email, username } = conditions
    const users = await this.findMany({ id, email, username })
    if (users.length > 1) {
      this.logger.error({ conditions }, 'More than one user found matching conditions')
      return null
    }
    // await this.delete(users[0])
    return users[0]
  }

  async findManyAndDelete(conditions: Partial<UserAttributes>): Promise<UserEntity[]> {
    return [
      new UserEntity({email: '', password: '', username: '', id: '1'})
    ]
  }

  async findOneAndUpdate(conditions: Partial<UserAttributes>): Promise<UserEntity> {
    return new UserEntity({email: '', password: '', username: '', id: '1'})
  }

  async findManyAndUpdate(conditions: Partial<UserAttributes>): Promise<UserEntity[]> {
    return [
      new UserEntity({email: '', password: '', username: '', id: '1'})
    ]
  }

}
