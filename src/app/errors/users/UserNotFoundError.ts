interface JsonApiErrorLinks {
  about?: string
}

interface JsonApiErrorSource {
  pointer?: string
  parameter?: string
}

interface JsonApiErrorMeta {
  [key: string]: any
}

interface JsonApiError {
  id?: string | number
  links?: JsonApiErrorLinks
  status?: string
  code?: string
  title?: string
  detail?: string
  source?: JsonApiErrorSource
  meta?: JsonApiErrorMeta
}

export default class UserNotFoundError extends Error {

  id: JsonApiError['id']
  links: JsonApiError['links']
  status: JsonApiError['status']
  code: JsonApiError['code']
  title: JsonApiError['title']
  detail: JsonApiError['detail']
  source: JsonApiError['source']
  meta: JsonApiError['meta']

  constructor(opts?: JsonApiError) {
    super()
    const defaultOpts: JsonApiError = {
      // id: '',
      links: {
        about: 'https://servys.io/docs/errors/users/not-found'
      },
      status: '404',
      code: '1404',
      title: 'UserNotFound',
      detail: 'User not found',
      // source: {},
      // meta: {}
    }
    const mergedOpts = Object.assign({}, defaultOpts, opts)
    this.id = mergedOpts.id
    this.links = mergedOpts.links
    this.status = mergedOpts.status
    this.code = mergedOpts.code
    this.title = mergedOpts.title
    this.detail = mergedOpts.detail
    this.source = mergedOpts.source
    this.meta = mergedOpts.meta
  }

}
