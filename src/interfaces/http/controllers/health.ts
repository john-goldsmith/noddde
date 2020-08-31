import { Context, Next } from 'koa'
import { createController } from 'awilix-koa'
import { Logger } from 'pino'

import { Cradle } from '../../../container'
import ApplicationController from './application'
import RepositoryManager from '../../../infra/database/repository-manager'
import SerializerManager from '../serializers/manager'
import OperationManager from '../../../app/operations/manager'

class UsersController extends ApplicationController {

  repositoryManager: RepositoryManager
  operationManager: OperationManager
  serializerManager: SerializerManager
  logger: Logger

  constructor(cradle: Cradle) {
    super()
    this.repositoryManager = cradle.repositoryManager
    this.operationManager = cradle.operationManager
    this.serializerManager = cradle.serializerManager
    this.logger = cradle.logger
  }

  /**
   * List health status of application components.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /health:
   *   get:
   *     summary: List health status of application components
   *     description: List health status of application components
   *     operationId: listHealth
   *     security: []
   *     tags:
   *       - Health
   *     responses:
   *       200:
   *         $ref: '#/components/responses/ListHealthOkResponse'
   *       400:
   *         $ref: '#/components/responses/BadRequestResponse'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedResponse'
   *       403:
   *         $ref: '#/components/responses/ForbiddenResponse'
   *       500:
   *         $ref: '#/components/responses/InternalServerErrorResponse'
   */
  async list(ctx: Context, next: Next): Promise<void> {
    try {
      const health = await this.operationManager.health.list()
      const serializedHealth = await this.serializerManager.jsonApi.serializeAsync('health', health, { self: ctx.request.originalUrl })
      ctx.response.status = 200
      ctx.response.body = serializedHealth
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 500
      error.status = 500
      ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      return next()
    }
  }

}

const controller = createController(UsersController)
  .prefix('/health')
  .get('', 'list')

export default controller
