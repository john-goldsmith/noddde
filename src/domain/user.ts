import BaseEntity, { BaseAttributes, BaseInstanceMethods } from './base'

export interface UserAttributes extends BaseAttributes {
  email?: string
  username?: string
  password?: string
}

export interface UserInstanceMethods extends BaseInstanceMethods {
  author(): string
}

export default class User extends BaseEntity implements UserAttributes, UserInstanceMethods {

  email?: string
  username?: string
  password?: string

  constructor(attributes: Partial<UserAttributes>) {
    super()
    this.id = attributes.id
    this.email = attributes.email
    this.username = attributes.username
    this.password = attributes.password
  }

  static fromObject(object: Partial<UserAttributes>): User {
    const user = new User(object)
    return user
  }

  /*toObject(): Partial<UserAttributes> {
    const { id, email, username, password } = this
    return {
      id,
      email,
      username,
      password
    }
  }*/

  toJSON(): Partial<UserAttributes> {
    const { id, email, username, password } = this
    return {
      id,
      email,
      username,
      password
    }
  }

  author(): string {
    return `${this.username} <${this.email}>`
  }

}
