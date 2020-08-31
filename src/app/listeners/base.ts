export interface Listener {
  exec: (args?: any) => Promise<void>
}

export default class BaseListener {}
