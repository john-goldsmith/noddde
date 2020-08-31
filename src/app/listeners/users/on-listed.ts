import User from '../../../domain/user'
// import UpdateUser from '../../operations/users/update'
import { Cradle } from '../../../container'
import CreateUser from '../../operations/users/create'
import { Listener } from '../base'

export default class UserOnListedListener implements Listener {

  // updateUserOperation: UpdateUserOperation
  // createUserOperation: CreateUserOperation
  // userOnCreatedListener: UserOnCreatedListener

  constructor(cradle: Cradle) {
    // this.updateUserOperation = cradle.updateUserOperation
    // this.createUserOperation = cradle.createUserOperation
    // this.userOnCreatedListener = cradle.userOnCreatedListener
    // this.createUser.on(this.createUser.events.USER_CREATED, this.exec)
  }

  async exec({ users }: { users: User[]}) {
    // await this.updateUserOperation.exec(user, {})
  }

}
