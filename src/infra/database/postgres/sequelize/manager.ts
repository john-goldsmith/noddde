// import Sequelize from 'sequelize'
import { Cradle } from '../../../../container'
import { Logger } from 'pino'
import { Config } from '../../../../../config/app'

export default class PostgresSequelizeManager {

  config: Config
  logger: Logger

  constructor(cradle: Cradle) {
    this.config = cradle.config
    this.logger = cradle.logger
  }

  async connect() {
    // const sequelize = new Sequelize('noddde_development', 'user', 'password', {
    //   host: '',
    //   dialect: 'postgres'
    // })
  }

  async close() {}

}