import UpdateUser from '../../operations/users/update'
import { Cradle } from '../../../container'
import { Listener } from '../base'
import { UserDocument } from '../../../infra/database/mongo/mongoose/models/user'

interface UserOnCreatedListenerExecParams {
  user: UserDocument
}

export default class UserOnCreatedListener implements Listener {

  updateUserOperation: UpdateUser

  constructor(cradle: Cradle) {
    this.updateUserOperation = cradle.updateUserOperation
  }

  async exec(params: UserOnCreatedListenerExecParams): Promise<void> {
    /*const user =*/ await this.updateUserOperation.exec(params.user, {username: `${params.user.username}!`})
    // return user
  }

}
