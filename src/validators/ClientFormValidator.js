import { omit } from 'underscore'

import BaseFormValidator from './BaseFormValidator'

import { interpolate, convertFileSize } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS, ALLOWED_FILE_FORMAT_MIME_TYPES } from 'lib/Constants'

const {GIF, JPG, PNG} = ALLOWED_FILE_FORMAT_MIME_TYPES

const FILE_TYPES = [GIF, JPG, PNG]

const ALLOWED_FILE_SIZE = 1

const {
    FILE_SIZE,
    FILE_FORMAT,
    EMPTY_FIELD,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM,
    PHONE_FORMAT,
    EMAIL_FORMAT,
    NUMBER_FORMAT,
    ZIP_CODE_FORMAT,
    NUMBER_LENGTH_MINIMUM,
    NUMBER_LENGTH_MAXIMUM,
    NUMBER_FORMAT_SPECIFIC
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    firstName: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 256,
            tooLong: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 256,
            tooLong: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    ssn: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        numericality: {
            notValid: NUMBER_FORMAT
        },
        length: {
            is: 9,
            message: interpolate(NUMBER_FORMAT_SPECIFIC, 9)
        },
    },
    birthDate:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    genderId:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    mainLogoPath: (value) => {
        let validationObj = {}

        if (value) {
            if (ALLOWED_FILE_SIZE < convertFileSize(value.size)) {
                validationObj = {
                    numericality: {
                        notValid: interpolate(FILE_SIZE, ALLOWED_FILE_SIZE)
                    },
                }
            }

            if (!FILE_TYPES.includes(value.type)) {
                validationObj = {
                    inclusion: {
                        message: interpolate(FILE_FORMAT, value.type)
                    }
                }
            }
        }
        return validationObj
    },
    "address.street": {
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
    "address.city": {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 256,
            tooLong: interpolate(LENGTH_MAXIMUM, 256)
        }
    },
    "address.stateId": {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
    },
    "address.zip": {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            is: 5,
            message: interpolate(ZIP_CODE_FORMAT, 5)
        },
        numericality: {
            notValid: ZIP_CODE_FORMAT
        }
    },
    organizationId:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    communityId:{
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    cellPhone: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        format: {
            pattern: /\+?\d{10,16}/,
            message: PHONE_FORMAT
        }
    },
    phone: (value) =>  value
        ? {
            format: {
                pattern: /\+?\d{10,16}/,
                message: PHONE_FORMAT
            },
        }
        : null,
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
    memberNumber: (value) =>  value
        ? {
        length: {
            maximum: 256,
            tooLong: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
        : null,
    medicareNumber: (value) =>  value
        ? {
        length: {
            maximum: 256,
            tooLong: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
        : null,
    medicaidNumber: (value) =>  value
        ? {
            length: {
                maximum: 256,
                tooLong: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
        : null,
    primaryCarePhysician: (value) =>  value
        ? {
            length: {
                maximum: 256,
                tooLong: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
        : null,
    currentPharmacyName: (value) =>  value
        ? {
            length: {
                maximum: 256,
                tooLong: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
        : null,
    referralSource: (value) =>  value
        ? {
            length: {
                maximum: 256,
                tooLong: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
        : null,
    riskScore: (value) =>  value
        ? {
            length: {
                maximum: 256,
                tooLong: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
        : null,
}

class ClientFormValidator extends BaseFormValidator {
    validate (data, { excluded = [] } = {}) {
        return super.validate(
            data,
            omit(CONSTRAINTS, excluded),
            { fullMessages: false }
        )
    }
}

const validator = new ClientFormValidator()
export default validator