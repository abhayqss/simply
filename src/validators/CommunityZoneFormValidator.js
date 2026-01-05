import BaseFormValidator from "./BaseFormValidator";

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    name: {
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
    sound: {
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
    soundCount: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            minimum: 1,
            message: EMPTY_FIELD
        }
    },
    soundInterval: {
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

class CommunityZoneFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new CommunityZoneFormValidator()
export default validator