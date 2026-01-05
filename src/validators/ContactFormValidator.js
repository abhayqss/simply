import { omit } from 'underscore'

import BaseFormValidator from './BaseFormValidator'

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const {
    EMPTY_FIELD,
    PHONE_FORMAT,
    FAX_FORMAT,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM,
    EMAIL_FORMAT,
    NUMBER_FORMAT,
    NUMBER_FORMAT_SPECIFIC
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
    systemRoleId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    organizationId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    communityId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    login: {
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
    secureMail: {
        optional: {
            email: {
                message: EMAIL_FORMAT
            },
            length: {
                maximum: 256,
                message: interpolate(LENGTH_MAXIMUM, 256)
            }
        }
    },
    mobilePhone: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        format: {
            pattern: /\+?\d{10,16}/,
            message: PHONE_FORMAT
        }
    },
    phone: {
        format: {
            pattern: /\+?(\d{10,16})?/,
            message: PHONE_FORMAT
        }
    },
    fax: {
        format: {
            pattern: /\+?(\d{10,16})?/,
            message: FAX_FORMAT
        }
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
            message: interpolate(NUMBER_FORMAT_SPECIFIC, 5)
        },
        numericality: {
            notValid: NUMBER_FORMAT
        }
    }
}

class ContactFormValidator extends BaseFormValidator {
    validate (data, { excluded = [] } = {}) {
        return super.validate(
            data,
            omit(CONSTRAINTS, excluded),
            { fullMessages: false }
        )
    }
}

const validator = new ContactFormValidator()
export default validator