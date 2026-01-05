import BaseFormValidator from "./BaseFormValidator";

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM,
    LENGTH_EQUAL,
    EMAIL_FORMAT,
    NUMBER_FORMAT
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    firstName: {
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
    lastName: {
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
    socialSecurityNumber: {
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
    dateOfBirth:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    gender:{
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
    cellPhone: {
        length: {
            is: 16,
            message: interpolate(LENGTH_EQUAL, 16)
        },
        numericality: {
            notValid: NUMBER_FORMAT
        }
    },
    homePhone: {
        length: {
            is: 16,
            message: interpolate(LENGTH_EQUAL, 16)
        },
        numericality: {
            notValid: NUMBER_FORMAT
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
}

class ClientEventFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new ClientEventFormValidator()
export default validator