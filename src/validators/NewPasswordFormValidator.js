import BaseFormValidator from "./BaseFormValidator";

import {extend} from 'underscore'

import {getPasswordRegExp} from 'lib/utils/Utils'
import {VALIDATION_ERROR_TEXTS} from 'lib/Constants'

const {
    EMPTY_FIELD,
    PASSWORD_COMPLEXITY,
    CONFIRM_PASSWORD_MATCH,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    password: (value, attributes, attributeName, options) => {
        const constraints = {
            presence: {
                allowEmpty: false,
                message: EMPTY_FIELD
            },
        }

        return getPasswordRegExp(options).test(value)
            ? constraints
            : {
                ...constraints,
                inclusion: {
                    message: PASSWORD_COMPLEXITY
                },
            }
    },
    confirmPassword: (value, attributes) => {
        const constraints = {
            presence: {
                allowEmpty: false,
                message: EMPTY_FIELD
            },
        }

        return (value < attributes.password || value > attributes.password)
            ? {
            ...constraints,
                inclusion: {
                    message: CONFIRM_PASSWORD_MATCH
                }
            }
         : constraints
    }
}

class NewPasswordFormValidator extends BaseFormValidator {
    validate (data, options) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false, ...options})
    }
}

const validator = new NewPasswordFormValidator()
export default validator