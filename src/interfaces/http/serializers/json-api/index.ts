import JSONAPISerializer from 'json-api-serializer'

import usersSerializer from './users'
import postsSerializer from './posts'
import healthSerializer from './health'
import commentsSerializer from './comments'
import registerSerializers from './register'

interface GlobalOptions {
  convertCase?: Casings
  unconvertCase?: Casings
  convertCaseCacheSize?: number
  jsonapiObject?: boolean
}

interface StringOrFunctionObject {
  [key: string]: string | Function
}

interface LinksObject extends StringOrFunctionObject {}

interface TopLevelMetaObject extends StringOrFunctionObject {}

interface TopLevelLinksObject extends StringOrFunctionObject {}

interface MetaObject extends StringOrFunctionObject {}

interface RelationshipLinksObject extends StringOrFunctionObject {}

interface RelationshipMetaObject extends StringOrFunctionObject {}

type DataFunction = (data: any) => any

type ExtraDataFunction = (extraData: any) => any

type DataExtraDataFunction = (data: any, extraData: any) => any

type Links = LinksObject | DataFunction | DataExtraDataFunction

type TopLevelMeta = TopLevelMetaObject | ExtraDataFunction | DataExtraDataFunction

type TopLevelLinks = TopLevelLinksObject | ExtraDataFunction | DataExtraDataFunction

type Meta = MetaObject | DataFunction | DataExtraDataFunction

type RelationshipFunction = (relationshipData: any, data: any) => any

type RelationshipType = string | RelationshipFunction

type RelationshipLinks = RelationshipLinksObject | DataFunction | DataExtraDataFunction

type RelationshipMeta = RelationshipMetaObject | DataFunction | DataExtraDataFunction

interface RelationshipOptions {
  type: RelationshipType
  alternativeKey?: string
  schema?: any
  links?: RelationshipLinks
  meta?: RelationshipMeta
  deserialize?: DataFunction
}

interface Relationships {
  [key: string]: RelationshipOptions
}

interface RegisterOptions {
  // Serialization options
  id?: string
  blacklist?: string[]
  whitelist?: string[]
  jasonapiObject?: boolean
  links?: Links
  topLevelMeta?: TopLevelMeta
  topLevelLinks?: TopLevelLinks
  meta?: Meta
  relationships?: Relationships
  convertCase?: Casings
  beforeSerialize?: (data: any) => any

  // Deserialization options
  unconvertCase?: Casings
  blacklistOnDeserialize?: string[]
  whitelistOnDeserialize?: string[]
  afterDeserialize?: (data: any) => any
}

enum Casings {
  Kebab = 'kebab-case',
  Snake = 'snake_case',
  Camel = 'camelCase'
}

type JsonApiObject = any // TODO:
type JsonApiError = any // TODO:

export interface JsonApiSerializer {
  register(type: string, options?: RegisterOptions): void
  serialize(type: string, data: any, extraData?: any): JsonApiObject
  serializeAsync(type: string, data: any, extraData?: any): Promise<JsonApiObject>
  deserialize(type: string, data: any): Promise<any>
  deserializeAsync(type: string, data: any): Promise<any>
  serializeError(error: Error | JsonApiError): JsonApiError
}

const globalOptions: GlobalOptions = {
  jsonapiObject: true
}

const jsonApiSerializer: JsonApiSerializer = new JSONAPISerializer(globalOptions)

registerSerializers(jsonApiSerializer, [
  usersSerializer,
  postsSerializer,
  commentsSerializer,
  healthSerializer
])

export default jsonApiSerializer
