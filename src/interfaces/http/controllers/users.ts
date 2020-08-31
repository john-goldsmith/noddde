import { Context, Next } from 'koa'
import 'koa-bodyparser'
// import Router, { RouterContext } from '@koa/router'
import { createController } from 'awilix-koa'

import { Cradle } from '../../../container'
import ApplicationController from './application'
import { Logger } from 'pino'
import RepositoryManager from '../../../infra/database/repository-manager'
import SerializerManager from '../serializers/manager'
import OperationManager from '../../../app/operations/manager'
import User from '../../../domain/user'
import UserNotFoundError from '../../../app/errors/users/UserNotFoundError'

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

  /*get router() {
    const router = new Router({
      prefix: '/users'
    })
    router.get('/', this.usersController.list)
    router.get('/:id', this.usersController.show)
    router.post('/', this.usersController.create)
    router.patch('/:id', this.usersController.patch)
    router.put('/:id', this.usersController.replace)
    router.delete('/:id', this.usersController.destroy)
    return router
  }*/

  /**
   * Get a list of users.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /users:
   *   get:
   *     summary: Get a list of users
   *     description: Get a list of users
   *     operationId: listUsers
   *     tags:
   *       - Users
   *     parameters:
   *       - $ref: '#/components/parameters/ListUsersIncludeQueryParameter'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/ListUsersOkResponse'
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
      const users = await this.operationManager.users.findMany({})
      const serializedUsers = await this.serializerManager.jsonApi.serializeAsync('users', users)
      ctx.response.status = 200
      ctx.response.body = serializedUsers
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 500
      error.status = 500
      ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      return next()
    }
  }

  /**
   * Get a user.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get a user.
   *     description: Get a user.
   *     operationId: getUser
   *     tags:
   *       - Users
   *     parameters:
   *       - $ref: '#/components/parameters/ShowUserIdPathParameter'
   *       - $ref: '#/components/parameters/ShowUserIncludeQueryParameter'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/ShowUserOkResponse'
   *       400:
   *         $ref: '#/components/responses/BadRequestResponse'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedResponse'
   *       403:
   *         $ref: '#/components/responses/ForbiddenResponse'
   *       500:
   *         $ref: '#/components/responses/InternalServerErrorResponse'
   */
  async show(ctx: Context, next: Next): Promise<void> {
    try {
      const user = await this.operationManager.users.findById(ctx.params.id)
      const serializedUser = await this.serializerManager.jsonApi.serializeAsync('users', user)
      ctx.response.status = 200
      ctx.response.body = serializedUser
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 400
      error.status = 500
      ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      return next()
    }
  }

  /**
   * Create a user.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /users:
   *   post:
   *     summary: Create a user.
   *     description: Create a user.
   *     operationId: createUser
   *     tags:
   *       - Users
   *     requestBody:
   *       $ref: '#/components/requestBodies/CreateUserRequestBody'
   *     responses:
   *       201:
   *         $ref: '#/components/responses/CreateUserCreatedResponse'
   *       400:
   *         $ref: '#/components/responses/BadRequestResponse'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedResponse'
   *       403:
   *         $ref: '#/components/responses/ForbiddenResponse'
   *       500:
   *         $ref: '#/components/responses/InternalServerErrorResponse'
   */
  async create(ctx: Context, next: Next): Promise<void> {
    try {
      const deserializedBody = await this.serializerManager.jsonApi.deserializeAsync('users', ctx.request.body)
      const user = await this.operationManager.users.createOne(deserializedBody)
      const serializedUser = await this.serializerManager.jsonApi.serializeAsync('users', user)
      ctx.response.status = 201
      ctx.response.body = serializedUser
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 500
      error.status = 500
      ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      return next()
    }
  }

  /**
   * Update a user.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: Update a user.
   *     description: Update a user.
   *     operationId: updateUser
   *     tags:
   *       - Users
   *     parameters:
   *       - $ref: '#/components/parameters/UpdateUserIdPathParameter'
   *       - $ref: '#/components/parameters/UpdateUserIncludeQueryParameter'
   *     requestBody:
   *       $ref: '#/components/requestBodies/UpdateUserRequestBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/UpdateUserOkResponse'
   *       400:
   *         $ref: '#/components/responses/BadRequestResponse'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedResponse'
   *       403:
   *         $ref: '#/components/responses/ForbiddenResponse'
   *       404:
   *         $ref: '#/components/responses/NotFoundResponse'
   *       500:
   *         $ref: '#/components/responses/InternalServerErrorResponse'
   */
  async update(ctx: Context, next: Next): Promise<void> {
    try {
      const user = await this.operationManager.users.findById(ctx.params.id)
      if (user) {
        const deserializedBody = await this.serializerManager.jsonApi.deserializeAsync('users', ctx.request.body)
        const updatedUser = await this.operationManager.users.updateOne(user, deserializedBody)
        const serializedUser = await this.serializerManager.jsonApi.serializeAsync('users', updatedUser)
        ctx.response.status = 200
        ctx.response.body = serializedUser
      } else {
        ctx.response.status = 404
        const error = new UserNotFoundError()
        ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      }
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 500
      error.status = 500
      ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      return next()
    }
  }

  /**
   * Replace a user.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Replace a user.
   *     description: Replace a user.
   *     operationId: replaceUser
   *     tags:
   *       - Users
   *     parameters:
   *       - $ref: '#/components/parameters/ReplaceUserIdPathParameter'
   *       - $ref: '#/components/parameters/ReplaceUserIncludeQueryParameter'
   *     requestBody:
   *       $ref: '#/components/requestBodies/ReplaceUserRequestBody'
   *     responses:
   *       200:
   *         $ref: '#/components/responses/ReplaceUserOkResponse'
   *       400:
   *         $ref: '#/components/responses/BadRequestResponse'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedResponse'
   *       403:
   *         $ref: '#/components/responses/ForbiddenResponse'
   *       404:
   *         $ref: '#/components/responses/NotFoundResponse'
   *       500:
   *         $ref: '#/components/responses/InternalServerErrorResponse'
   */
  async replace(ctx: Context, next: Next): Promise<void> {
    try {
      const user = await this.operationManager.users.findById(ctx.params.id)
      if (user) {
        const deserializedBody = await this.serializerManager.jsonApi.deserializeAsync('users', ctx.request.body)
        const replacedUser = await this.operationManager.users.updateOne(user, deserializedBody)
        const serializedUser = await this.serializerManager.jsonApi.serializeAsync('users', replacedUser)
        ctx.response.status = 200
        ctx.response.body = serializedUser
      } else {
        ctx.response.status = 404
        const error = new UserNotFoundError()
        ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      }
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 500
      error.status = 500
      ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      return next()
    }
  }

  /**
   * Destroy a user.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Destroy a user.
   *     description: Destroy a user.
   *     operationId: destroyUser
   *     tags:
   *       - Users
   *     parameters:
   *       - $ref: '#/components/parameters/DestroyUserIdPathParameter'
   *     responses:
   *       204:
   *         $ref: '#/components/responses/DestroyUserNoContentResponse'
   *       400:
   *         $ref: '#/components/responses/BadRequestResponse'
   *       401:
   *         $ref: '#/components/responses/UnauthorizedResponse'
   *       403:
   *         $ref: '#/components/responses/ForbiddenResponse'
   *       404:
   *         $ref: '#/components/responses/NotFoundResponse'
   *       500:
   *         $ref: '#/components/responses/InternalServerErrorResponse'
   */
  async destroy(ctx: Context, next: Next) {
    try {
      const user = await this.operationManager.users.findById(ctx.params.id)
      if (user) {
        await this.operationManager.users.deleteOne(user)
        ctx.response.status = 204
      } else {
        ctx.response.status = 404
        const error = new UserNotFoundError()
        ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      }
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 500
      error.status = 500
      ctx.response.body = this.serializerManager.jsonApi.serializeError(error)
      return next()
    }
  }

  /**
   * Lists available user relationships.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * swagger
   * /users/relationships:
   *   get:
   *     summary: Destroy a user.
   *     description: Destroy a user.
   *     operationId: listUserRelationships
   *     tags:
   *       - Users
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
  async listRelationships(ctx: Context, next: Next) {
    try {
      const relationships = [
        'posts',
        'comments'
      ]
      const serializedRelationships = await this.serializerManager.jsonApi.serializeAsync('users', relationships)
      ctx.response.status = 204
      ctx.response.body = serializedRelationships
      return next()
    } catch (error) {
      this.logger.error(error)
      ctx.response.status = 400
      ctx.response.body = error.message
      return next()
    }
  }

  /**
   * Lists available user relationships.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * swagger
   * /users/{id}/relationships/comments:
   *   get:
   *     summary: Destroy a user.
   *     description: Destroy a user.
   *     operationId: listUserComments
   *     tags:
   *       - Users
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
  async listCommentsRelationship(ctx: Context, next: Next) {}

  /**
   * Lists available user relationships.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * swagger
   * /users/{id}/relationships/comments:
   *   post:
   *     summary: Destroy a user.
   *     description: Destroy a user.
   *     operationId: createUserComments
   *     tags:
   *       - Users
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
  async createCommentsRelationship(ctx: Context, next: Next) {}

  /**
   * Lists available user relationships.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * swagger
   * /users/{id}/relationships/comments:
   *   patch:
   *     summary: Destroy a user.
   *     description: Destroy a user.
   *     operationId: updateUserComments
   *     tags:
   *       - Users
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
  async updateCommentsRelationship(ctx: Context, next: Next) {}

  /**
   * Lists available user relationships.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * swagger
   * /users/{id}/relationships/comments:
   *   put:
   *     summary: Destroy a user.
   *     description: Destroy a user.
   *     operationId: replaceUserComments
   *     tags:
   *       - Users
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
  async replaceCommentsRelationship(ctx: Context, next: Next) {}

  /**
   * Lists available user relationships.
   *
   * @async
   * @param {Context} ctx
   * @param {Next} next
   * @returns {Promise}
   * swagger
   * /users/{id}/relationships/comments:
   *   post:
   *     summary: Destroy a user.
   *     description: Destroy a user.
   *     operationId: destroyUserComments
   *     tags:
   *       - Users
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
  async destroyCommentsRelationship(ctx: Context, next: Next) {}

}

const controller = createController(UsersController)
  .prefix('/users')
  .get('', 'list')
  .get('/:id/relationships', 'listRelationships')
  .get('/:id/relationships/comments', 'listCommentsRelationship')
  .post('/:id/relationships/comments', 'createCommentsRelationship')
  .patch('/:id/relationships/comments', 'updateCommentsRelationship')
  .put('/:id/relationships/comments', 'replaceCommentsRelationship')
  .delete('/:id/relationships/comments', 'destroyCommentsRelationship')
  .get('/:id', 'show')
  .post('', 'create')
  .patch('/:id', 'update')
  .put('/:id', 'replace')
  .delete('/:id', 'destroy')

export default controller

// const invoker = makeInvoker(API)
// export default invoker
