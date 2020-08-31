import UserOnCreatedListener from './on-created'
import UserOnDeletedListener from './on-deleted'
import UserOnFoundListener from './on-found'
import UserOnListedListener from './on-listed'
import UserOnUpdatedListener from './on-updated'
import { Cradle } from '../../../container'

export default class UserListenerManager /* extends BaseListener? */ {

  userOnCreatedListener: UserOnCreatedListener
  userOnDeletedListener: UserOnDeletedListener
  userOnFoundListener: UserOnFoundListener
  userOnListedListener: UserOnListedListener
  userOnUpdatedListener: UserOnUpdatedListener

  constructor(cradle: Cradle) {
    this.userOnCreatedListener = cradle.userOnCreatedListener
    this.userOnDeletedListener = cradle.userOnDeletedListener
    this.userOnFoundListener = cradle.userOnFoundListener
    this.userOnListedListener = cradle.userOnListedListener
    this.userOnUpdatedListener = cradle.userOnUpdatedListener
  }

}