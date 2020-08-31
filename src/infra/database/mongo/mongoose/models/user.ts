import {
  model,
  Schema,
  Document,
  Model
} from 'mongoose'

import UserEntity, { UserAttributes, UserInstanceMethods } from '../../../../../domain/user'

export interface MongoMongooseUserDocument extends UserInstanceMethods, UserAttributes, Document {}

export interface MongoMongooseUserModel extends Model<MongoMongooseUserDocument> {}

const userSchema = new Schema<MongoMongooseUserDocument>({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  username: {
    type: String,
    // unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

userSchema.loadClass(UserEntity)

export default model<MongoMongooseUserDocument, MongoMongooseUserModel>('User', userSchema)
