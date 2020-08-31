import swaggerJSDoc from 'swagger-jsdoc'

import swaggerDefinition from './definition'

const options = {
  swaggerDefinition,
  apis: [
    'src/interfaces/http/controllers/**/*.ts',
    'src/interfaces/http/openapi/tags/**/*.yml',
    'src/interfaces/http/openapi/components/**/*.yml'
  ]
}

const spec = swaggerJSDoc(options)
// console.log(JSON.stringify(spec))
export default spec
