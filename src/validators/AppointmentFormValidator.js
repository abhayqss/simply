import BaseFormValidator from "./BaseFormValidator";

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MAXIMUM,
    EMAIL_FORMAT,
    PHONE_FORMAT,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    name: {
        presence: {
            allowEmpty: false, message: EMPTY_FIELD
        },
        length: {
            maximum: 256, tooLong: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    serviceIds: {
        presence: {
            allowEmpty: false, message: EMPTY_FIELD
        }
    },
    phone: {
        format: {
            pattern: /\+?\d{10,16}/,
            message: PHONE_FORMAT
        }
    },
    email: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        email: {
            message: EMAIL_FORMAT
        },
        length: {
            maximum: 256,
            message: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    appointmentDate: {
        presence: {
            allowEmpty: false, message: EMPTY_FIELD
        }
    },
    comment: {
        length: {
            maximum: 5000, message: interpolate(LENGTH_MAXIMUM, 5000)
        }
    }
}

class AppointmentValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, { fullMessages: false })
    }
}

const validator = new AppointmentValidator()
export default validator