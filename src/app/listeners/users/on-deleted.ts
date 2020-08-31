import { Cradle } from '../../../container'
import UpdateUser from '../../operations/users/update'
import { Listener } from '../base'
import { UserDocument } from '../../../infra/database/mongo/mongoose/models/user'

interface UserOnDeletedListenerExecParams {
  user: UserDocument
}

export default class UserOnDeletedListener implements Listener {

  updateUserOperation: UpdateUser

  constructor(cradle: Cradle) {
    this.updateUserOperation = cradle.updateUserOperation
  }

  async exec(params: UserOnDeletedListenerExecParams) {
    await this.updateUserOperation.exec(params.user, {})
  }

}
