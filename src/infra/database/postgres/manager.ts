import PostgresSequelizeManager from "./sequelize/manager"
import { Cradle } from "../../../container"

export default class PostgresManager {

  postgresSequelizeManager: PostgresSequelizeManager

  constructor(cradle: Cradle) {
    this.postgresSequelizeManager = cradle.postgresSequelizeManager
  }

  async connect() {
    await this.postgresSequelizeManager.connect()
  }

  async close() {
    await this.postgresSequelizeManager.close()
  }

}