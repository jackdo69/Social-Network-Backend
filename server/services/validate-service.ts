import { CustomError } from './error-service'
import Ajv from 'ajv'
import addFormats from 'ajv-formats';
import post from '../data/schemas/post.json'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['date-time', 'email']);

require('ajv-keywords')(ajv);

ajv.addSchema(post);

export default function validate(id: string, payload) {
    if (!ajv.validate(id, payload)) {
        throw new CustomError(400, JSON.stringify(ajv.errors));
    }
}