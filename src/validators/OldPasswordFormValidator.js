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
    password: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
    },
    newPassword: (value, attributes, attributeName, options) => {
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
    confirmNewPassword: (value, attributes) => {
        const constraints = {
            presence: {
                allowEmpty: false,
                message: EMPTY_FIELD
            },
        }

        return (value < attributes.newPassword || value > attributes.newPassword)
            ? {
                ...constraints,
                inclusion: {
                    message: CONFIRM_PASSWORD_MATCH
                }
            }
            : constraints
    }
}

class OldPasswordFormValidator extends BaseFormValidator {
    validate (data, options) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false, ...options})
    }
}

const validator = new OldPasswordFormValidator()
export default validator