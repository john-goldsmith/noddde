interface AppConfig {
  version: string
}

export interface Config {
  port: number
  app: AppConfig
}

export default {
  port: 3001,
  app: {
    version: '1'
  }
}