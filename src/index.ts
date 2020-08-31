import container from './container'
import Application from './app/app'

const { application }: { application: Application } = container.cradle

application.start(container)
  .catch((error: Error) => {
    application.server.logger.error(error.message)
    process.exit(1)
  })
