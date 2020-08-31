// const { api } = require('../environment')
// const { server, version } = api

export default {
  openapi: '3.0.3',
  info: {
    title: 'Noddde API',
    description: 'Noddde API',
    termsOfService: 'https://noddde.servys.io/terms',
    contact: {
      name: 'Noddde Development Team',
      email: 'noddde@servys.com'
    },
    license: {
      name: 'MIT'
    },
    version: '1.0.0'
  },
  servers: [
    {
      // url: `${server}/${version}`
      url: 'http://localhost:3001/'
    }
  ],
  security: [
    {
      http_jwt: []
    }
  ]
}
