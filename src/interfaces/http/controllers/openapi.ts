import { Context, Next } from 'koa'
import 'koa-bodyparser'
// import Router from '@koa/router'
import { createController } from 'awilix-koa'
import { Cradle } from '../../../container'
import ApplicationController from './application'
import { Logger } from 'pino'
import spec from '../../../spec'

class DocsController extends ApplicationController {

  logger: Logger

  constructor(cradle: Cradle) {
    super()
    this.logger = cradle.logger
  }

  /*get router() {
    const router = new Router({
      prefix: '/users'
    })
    router.get('/', this.usersController.list)
    return router
  }*/

  /**
   * Returns an Open API (Swagger) compliant spec. This should NOT use
   * a JSON:API serializer since it would make the spec invalid.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /openapi:
   *   get:
   *     summary: Returns an Open API (Swagger) compliant spec.
   *     description: Returns an Open API (Swagger) compliant spec.
   *     operationId: listDocs
   *     security: []
   *     tags:
   *       - OpenAPI
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/vnd.api+json:
   *             schema:
   *               type: object
   *               properties:
   *                 foo:
   *                   type: string
   */
  async list(ctx: Context, next: Next): Promise<void> {
    try {
      ctx.response.status = 200
      ctx.response.body = spec
      return next()
    } catch (error) {

    }
  }

}

const controller = createController(DocsController)
  .prefix('/openapi')
  .get('', 'list')

export default controller

// const invoker = makeInvoker(API)
// export default invoker
