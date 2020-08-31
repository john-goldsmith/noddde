import { Cradle } from "../../container"
import MongoManager from "./mongo/manager"
import PostgresManager from "./postgres/manager"

export default class DatabaseManager {

  mongoManager: MongoManager
  postgresManager: PostgresManager

  constructor(cradle: Cradle) {
    this.mongoManager = cradle.mongoManager
    this.postgresManager = cradle.postgresManager
  }

  async connect() {
    await this.mongoManager.connect()
    // await this.postgresManager.connect()
  }

  async close() {
    await this.mongoManager.close()
    // await this.postgresManager.close()
  }

}