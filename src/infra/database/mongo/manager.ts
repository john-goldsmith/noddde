import MongoMongooseManager from "./mongoose/manager"
import { Cradle } from "../../../container"

export default class MongoManager {

  mongoMongooseManager: MongoMongooseManager

  constructor(cradle: Cradle) {
    this.mongoMongooseManager = cradle.mongoMongooseManager
  }

  async connect() {
    await this.mongoMongooseManager.connect()
  }

  async close() {
    await this.mongoMongooseManager.close()
  }

}
