import BaseFormValidator from "./BaseFormValidator";

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MAXIMUM,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    companyId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 10,
            message: interpolate(LENGTH_MAXIMUM, 10)
        }
    },
    username: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 256,
            message: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    password: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 128,
            message: interpolate(LENGTH_MAXIMUM, 128)
        }
    }
}

class LoginFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new LoginFormValidator()
export default validator