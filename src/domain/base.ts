export interface BaseAttributes {
  id?: any
}

export interface BaseInstanceMethods {
  toString(): string
  // toJSON(): object
}

export default class BaseEntity implements BaseAttributes, BaseInstanceMethods {

  id?: any

  constructor() {
    this.id = ''
  }

  // equals(other): boolean {}

  // referenceEquals(id): boolean {}

  toString(): string {
    return this.id
  }

  /*toJSON() {
    throw new Error('Derived classes must implement a \'toJSON\' method')
  }*/

  static fromObject(...args) {
    throw new Error('Derived classes must implement a static \'fromObject\' method')
  }

}
