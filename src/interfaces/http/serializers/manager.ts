import { Cradle } from '../../../container'
import { JsonApiSerializer } from './json-api'

export default class SerializerManager {

  private jsonApiSerializer: JsonApiSerializer

  constructor(cradle: Cradle) {
    this.jsonApiSerializer = cradle.jsonApiSerializer
  }

  get jsonApi() {
    return this.jsonApiSerializer
  }

}
