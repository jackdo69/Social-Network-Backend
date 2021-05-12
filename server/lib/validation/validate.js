import ajv from './ajv';
import { ErrorHandler } from '../../lib/error'

export default function validate(id, payload) {
    if (!ajv.validate(id, payload)) {
        throw new ErrorHandler(400, JSON.stringify(ajv.errors));
    }
}