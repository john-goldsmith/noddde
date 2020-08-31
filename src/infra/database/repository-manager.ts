import { Cradle } from "../../container"
import MongoMongooseUserRepository from "./mongo/mongoose/repositories/user"

export default class RepositoryManager {

  private mongoMongooseUserRepository: MongoMongooseUserRepository
  // private postgresSequelizeUserRepository: PostgresSequelizeUserRepository

  constructor(cradle: Cradle) {
    this.mongoMongooseUserRepository = cradle.mongoMongooseUserRepository
  }

  get mongoMongooseUsers(): MongoMongooseUserRepository {
    return this.mongoMongooseUserRepository
  }

  // get postgresSequelizeUsers(): PostgresSequelizeUserRepository {
  //   return this.postgresSequelizeUserRepository
  // }

}
