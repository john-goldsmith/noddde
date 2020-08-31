import mongoose from 'mongoose'
import { Logger } from 'pino'
import { Cradle } from '../../../../container'
import { Config } from '../../../../../config/app'

export default class MongoMongooseManager {

  config: Config
  logger: Logger
  connection!: mongoose.Mongoose

  constructor(cradle: Cradle) {
    this.config = cradle.config
    this.logger = cradle.logger
  }

  /**
   * @returns {Promise<undefined>}
   */
  async connect() {
    this.logger.info('Connecting to Mongo using Mongoose...')
    mongoose.set('useCreateIndex', true)
    // mongoose.set('useFindAndModify', false)
    try {
      this.connection = await mongoose.connect(`mongodb://root:root@mongo:27017/noddde_development`, {
        useNewUrlParser: true, // See https://mongoosejs.com/docs/deprecations.html#the-usenewurlparser-option
        useUnifiedTopology: true, // See https://mongoosejs.com/docs/deprecations.html#useunifiedtopology
        useFindAndModify: false // See https://mongoosejs.com/docs/deprecations.html#findandmodify
      })
      this.logger.info('Connected to Mongo using Mongoose.')
    } catch (error) {
      this.logger.error('Error connecting to Mongo using Mongoose.', error)
      process.exit(1)
    }
  }

  /**
   * @returns {Promise<undefined>}
   */
  async close(): Promise<void> {
    this.logger.info('Closing Mongo connection using Mongoose...')
    try {
      await mongoose.connection.close()
      this.logger.info('Closed Mongo connection using Mongoose.')
    } catch (error) {
      this.logger.error('Error closing Mongo connection using Mongoose.', error)
      process.exit(1)
    }
  }

}
