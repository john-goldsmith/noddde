import { JsonApiSerializer } from './index'

export default function(jsonApiSerializer: JsonApiSerializer): void {
  jsonApiSerializer.register('health', {
    topLevelLinks: extraData => {
      const { self } = extraData
      return Boolean(self)
        ? { self }
        : false
    }
  })
}
