import Router from '@koa/router'

import ApplicationRouter from './application'
import { Cradle } from '../../../container'

export default class UserRouter extends ApplicationRouter {

  usersController: any // TODO: Type check

  constructor(cradle: Cradle) {
    super()
    this.usersController = cradle.usersController
  }

  get router(/*ctx, next*/) {
    const router = new Router({
      prefix: '/users'
    })
    router.get('/', this.usersController.list)
    router.get('/:id', this.usersController.show.bind(this.usersController))
    router.post('/', this.usersController.create)
    router.patch('/:id', this.usersController.patch)
    router.put('/:id', this.usersController.replace)
    router.delete('/:id', this.usersController.destroy)
    return router
  }

}