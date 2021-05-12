import Ajv from 'ajv'
import addFormats from 'ajv-formats';
import post from './schemas/post.json'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['date-time', 'email']);

require('ajv-keywords')(ajv);

ajv.addSchema(post);

export default ajv;