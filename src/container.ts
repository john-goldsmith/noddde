import { createContainer, asValue, asClass, asFunction, AwilixContainer } from 'awilix'

import Server from './interfaces/http/server'
import Application from './app/app'
import logger from './infra/logger/index'
import config, { Config } from '../config/app'

import OperationManager from './app/operations/manager'

import CreateUserOperation from './app/operations/users/create'
import DeleteUserOperation from './app/operations/users/delete'
import FindUserOperation from './app/operations/users/find'
import UpdateUserOperation from './app/operations/users/update'
import UserOperationManager from './app/operations/users/manager'

import HealthOperationManager from './app/operations/health/manager'
import ListHealthOperation from './app/operations/health/list'

import DatabaseManager from './infra/database/manager'
import MongoManager from './infra/database/mongo/manager'
import PostgresManager from './infra/database/postgres/manager'
// import MysqlManager from './infra/database/mysql/manager'
import MongoMongooseManager from './infra/database/mongo/mongoose/manager'
import PostgresSequelizeManager from './infra/database/postgres/sequelize/manager'
// import MysqlSequelizeManager from './infra/database/mysql/sequelize/manager'

import MongoMongooseUser, { MongoMongooseUserModel } from './infra/database/mongo/mongoose/models/user'
import UserEntity from './domain/user'

// import UserRouter from './interfaces/http/routers/user'
// import ApplicationRouter from './interfaces/http/routers/application'

// import UsersController from './interfaces/http/controllers/users'

import MongoMongooseUserRepository from './infra/database/mongo/mongoose/repositories/user'
// import PostgresSequelizeUserRepository from './infra/database/postgres/sequelize/repositories/user'
import { Logger } from 'pino'
import RepositoryManager from './infra/database/repository-manager'

import SerializerManager from './interfaces/http/serializers/manager'
import jsonApiSerializer, { JsonApiSerializer } from './interfaces/http/serializers/json-api/index'

export interface Cradle {
  server: Server
  application: Application
  logger: Logger
  config: Config
  mongoManager: MongoManager
  postgresManager: PostgresManager
  mongoMongooseManager: MongoMongooseManager
  postgresSequelizeManager: PostgresSequelizeManager
  databaseManager: DatabaseManager
  mongoMongooseUserRepository: MongoMongooseUserRepository
  // postgresSequelizeUserRepository: MongoMongooseUserRepository
  repositoryManager: RepositoryManager
  MongoMongooseUser: MongoMongooseUserModel
  UserEntity: UserEntity
  createUserOperation: CreateUserOperation
  deleteUserOperation: DeleteUserOperation
  findUserOperation: FindUserOperation
  updateUserOperation: UpdateUserOperation
  usersController: any // TODO: Type check
  userOperationManager: UserOperationManager
  healthOperationManager: HealthOperationManager
  listHealthOperation: ListHealthOperation
  jsonApiSerializer: JsonApiSerializer
  serializerManager: SerializerManager
  operationManager: OperationManager
}

const container: AwilixContainer = createContainer<Cradle>()

container.register({
  // system
  server: asClass(Server).singleton(),
  application: asClass(Application).singleton(),
  logger: asValue(logger),
  config: asValue(config),

  // routers
  // applicationRouter: asClass(ApplicationRouter),
  // userRouter: asClass(UserRouter),

  // usersController: asClass(UsersController),
  // usersController: asValue(UsersController),

  // operations
  operationManager: asClass(OperationManager),

  createUserOperation: asClass(CreateUserOperation),
  deleteUserOperation: asClass(DeleteUserOperation),
  findUserOperation: asClass(FindUserOperation),
  updateUserOperation: asClass(UpdateUserOperation),
  userOperationManager: asClass(UserOperationManager).singleton(),//.scoped(),

  listHealthOperation: asClass(ListHealthOperation).singleton(),//.scoped(),
  healthOperationManager: asClass(HealthOperationManager).singleton(),//.scoped(),

  // repositories
  mongoMongooseUserRepository: asClass(MongoMongooseUserRepository).singleton(),
  MongoMongooseUser: asValue(MongoMongooseUser),
  // postgresUserRepository: asClass(PostgresSequelizeUserRepository).singleton(),
  repositoryManager: asClass(RepositoryManager).singleton(),

  // databases
  databaseManager: asClass(DatabaseManager).singleton(),
  mongoManager: asClass(MongoManager).singleton(),
  postgresManager: asClass(PostgresManager).singleton(),
  // mysqlManager: asClass(MysqlManager).singleton(),
  mongoMongooseManager: asClass(MongoMongooseManager).singleton(),
  postgresSequelizeManager: asClass(PostgresSequelizeManager).singleton(),
  // mysqlSequelizeManager: asClass(MysqlSequelizeManager).singleton()

  // domain entities
  UserEntity: asValue(UserEntity),

  // serializers
  serializerManager: asClass(SerializerManager),
  jsonApiSerializer: asValue(jsonApiSerializer),
})

export default container
