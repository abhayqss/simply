import BaseFormValidator from "./BaseFormValidator";

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    type: {
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
    workflow: {
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
    autoCloseInterval: {
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
}

class CommunityDeviceTypeFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new CommunityDeviceTypeFormValidator()
export default validator