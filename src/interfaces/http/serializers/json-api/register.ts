import { JsonApiSerializer } from './index'

export type JsonApiSerializerFn = (jsonApiSerializer: JsonApiSerializer) => void // TODO: This doesn't seem to get entirely enforced

export default function(jsonApiSerializer: JsonApiSerializer, serializerFns: JsonApiSerializerFn[]): void {
  serializerFns.forEach(serializerFn => serializerFn(jsonApiSerializer))
}
