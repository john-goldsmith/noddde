import { JsonApiSerializer } from './index'

export default function(jsonApiSerializer: JsonApiSerializer): void {
  jsonApiSerializer.register('posts')
}
