import { AwilixContainer } from 'awilix'
import http from 'http'
import Koa, { Context, Next } from 'koa'
import koaCors from '@koa/cors'
import { oas } from 'koa-oas3'
import { scopePerRequest, loadControllers } from 'awilix-koa'
import koaPinoLogger from 'koa-pino-logger'
import koaBodyParser from 'koa-bodyparser'
import { Logger } from 'pino'

import { Cradle } from '../../container'
import spec from '../../spec'
import SerializerManager from './serializers/manager'

export default class Server {

  config: any
  logger: Logger
  koa: Koa
  serializerManager: SerializerManager

  constructor(cradle: Cradle) {
    this.config = cradle.config
    this.logger = cradle.logger
    this.serializerManager = cradle.serializerManager
    this.koa = new Koa()
  }

  async start(container: AwilixContainer) {
    try {
      const server = this.create(container)
      server.listen(this.config.port, () => this.logger.info(`Listening on port ${this.config.port}`))
    } catch (err) {
      this.logger.error(err)
      process.exit(1)
    }
  }

  create(container: AwilixContainer) {
    this.koa.use(koaPinoLogger())
            .use(koaCors())
            .use(koaBodyParser())
            .use(scopePerRequest(container))
            // currentUser middleware
            // .use((ctx: Context, next: Next) => {
            //   ctx.state.container.register({
            //     currentUser: asValue({name: `John_${Date.now()}`})
            //   })
            //   return next()
            // })
            .use(loadControllers('./controllers/*.{t,j}s', {
              cwd: __dirname
            }))
            .use(oas({
              spec,
              enableUi: false,
              validateResponse: true,
              errorHandler: (error: Error, ctx: Context) => {
                console.log('error', error)
                console.log('error', error.name)
                console.log('error', error.message)
                // @ts-ignore
                console.log('error', error.meta.rawErrors)
                ctx.response.status = 400
                ctx.response.body = {
                  errors: [
                    {
                      status: '400',
                      title: error.name,
                      detail: error.message,
                      source: {
                        // @ts-ignore
                        pointer: 'foo' // error.meta?.rawErrors[0]?.path
                      },
                      // @ts-ignore
                      meta: error.meta
                    }
                  ]
                }
              }
            }))
            .use((ctx: Context, next: Next) => {
              ctx.response.set({
                'Content-Type': 'application/vnd.api+json'
              })
            })
    return http.createServer(this.koa.callback())
  }

}
