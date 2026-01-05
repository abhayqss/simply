import {map} from 'underscore'

import BaseFormValidator from "./BaseFormValidator";

import {interpolate} from 'lib/utils/Utils'
import {VALIDATION_ERROR_TEXTS} from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MAXIMUM,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    employeeId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    roleId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    description: {
        presence: {
            allowEmpty: true,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 256,
            message: interpolate(LENGTH_MAXIMUM, 256)
        }
    }
}

class CareTeamFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new CareTeamFormValidator()
export default validator