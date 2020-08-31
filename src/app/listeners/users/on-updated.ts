import { Cradle } from '../../../container'
import UpdateUser from '../../operations/users/update'
import { Listener } from '../base'
import { UserDocument } from '../../../infra/database/mongo/mongoose/models/user'

interface UserOnUpdatedListenerExecParams {
  user: UserDocument
}

export default class UserOnUpdatedListener implements Listener {

  updateUserOperation: UpdateUser

  constructor(cradle: Cradle) {
    this.updateUserOperation = cradle.updateUserOperation
  }

  async exec(params: UserOnUpdatedListenerExecParams) {
    await this.updateUserOperation.exec(params.user, {})
  }

}
