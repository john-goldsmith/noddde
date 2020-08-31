import { Cradle } from '../../../../../container'
import MongoMongooseBaseRepository from './base'
import { UserAttributes } from '../../../../../domain/user'
import { MongoMongooseUserDocument } from '../models/user'

export default class MongoMongooseUserRepository extends MongoMongooseBaseRepository<UserAttributes, MongoMongooseUserDocument> {

  constructor(cradle: Cradle) {
    super(cradle.MongoMongooseUser)
  }

}
