import { CustomError } from './error-service';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import post from '../data/schemas/post.json';
import user from '../data/schemas/user.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['date-time', 'email']);

require('ajv-keywords')(ajv, ['transform',]);
require('ajv-errors')(ajv);

ajv.addSchema(post);
ajv.addSchema(user);

export default function validate(id: string, payload) {
    if (!ajv.validate(id, payload)) {
        const errorMessage = ajv.errors[0].message;

        throw new CustomError(400, errorMessage);
    }
}