import { Cradle } from '../../../container'
import UpdateUser from '../../operations/users/update'
import { Listener } from '../base'
import { UserDocument } from '../../../infra/database/mongo/mongoose/models/user'

interface UserOnFoundListenerExecParams {
  user: UserDocument
}

export default class UserOnFoundListener implements Listener {

  updateUserOperation: UpdateUser

  constructor(cradle: Cradle) {
    this.updateUserOperation = cradle.updateUserOperation
  }

  async exec(params: UserOnFoundListenerExecParams) {
    await this.updateUserOperation.exec(params.user, {})
  }

}
