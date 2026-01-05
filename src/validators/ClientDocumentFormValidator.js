import BaseFormValidator from "./BaseFormValidator";

import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    document: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    sharingOption: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
}

class ClientDocumentFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new ClientDocumentFormValidator()
export default validator