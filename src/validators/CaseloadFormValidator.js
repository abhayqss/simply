import BaseFormValidator from "./BaseFormValidator";

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    caseloadName: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            minimum: 3,
            maximum: 256,
            tooShort: interpolate(LENGTH_MINIMUM, 3),
            tooLong: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    description: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            minimum: 3,
            maximum: 1000,
            tooShort: interpolate(LENGTH_MINIMUM, 3),
            tooLong: interpolate(LENGTH_MAXIMUM, 1000)
        }
    },
    serviceCoordinator:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    backupPerson:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    organization:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    community:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    active:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
}

class CaseloadFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new CaseloadFormValidator()
export default validator