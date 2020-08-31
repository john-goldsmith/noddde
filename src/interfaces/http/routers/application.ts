// import Router from '@koa/router'
import { Context, Next } from 'koa'

export default class ApplicationRouter {

  // constructor({ /*userRouter*/ }) {
    // this.userRouter = userRouter
  // }

  // get routers() {
  routers(ctx: Context, next: Next) {
    // const router = new Router()
    // router.use(this.userRouter.router.routes())
    // return [
    //   this.userRouter.router//.routes()
    // ]
    return [
      ctx.state.container.cradle.userRouter.router.routes()
    ]
  }
}