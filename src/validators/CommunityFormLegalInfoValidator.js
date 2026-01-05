import filesize from 'filesize'

import BaseFormValidator from './BaseFormValidator'

import { interpolate } from 'lib/utils/Utils'

import {
    VALIDATION_ERROR_TEXTS,
    ALLOWED_FILE_FORMAT_MIME_TYPES
} from 'lib/Constants'


const {GIF, JPG, PNG} = ALLOWED_FILE_FORMAT_MIME_TYPES

const FILE_TYPES = [GIF, JPG, PNG]

const ALLOWED_FILE_SIZE_IN_MB = 1

const {
    FILE_SIZE,
    FILE_FORMAT,
    EMPTY_FIELD,
    EMAIL_FORMAT,
    PHONE_FORMAT,
    NUMBER_FORMAT,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM,
    NUMBER_FORMAT_SPECIFIC
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
    oid: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 256,
            message: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    /*isSharingData: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
    },*/
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
    phone: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        format: {
            pattern: /\+?\d{10,16}/,
            message: PHONE_FORMAT
        }
    },
    logo: (value) => {
        let constraint = {}

        if (value instanceof File) {
            if (ALLOWED_FILE_SIZE_IN_MB < filesize(value.size, { output: 'object', exponent: 2 }).value) {
                constraint.numericality = {
                    notValid: interpolate(FILE_SIZE, ALLOWED_FILE_SIZE_IN_MB)
                }
            }

            if (!FILE_TYPES.includes(value.type)) {
                constraint.inclusion = {
                    message: interpolate(FILE_FORMAT, value.type)
                }
            }
        }

        return constraint
    },
    street: {
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
    city: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 256,
            message: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    stateId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    zipCode: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            is: 5,
            message: interpolate(NUMBER_FORMAT_SPECIFIC, 5)
        },
        numericality: {
            notValid: NUMBER_FORMAT
        }
    }
}

class CommunityFormLegalInfoValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new CommunityFormLegalInfoValidator()
export default validator