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
    primaryFocusIds: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    communityTypeIds: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    serviceTreatmentApproachIds: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    servicesSummaryDescription: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 5000,
            message: interpolate(LENGTH_MAXIMUM, 5000)
        }
    },
    prerequisite: {
        length: {
            maximum: 5000,
            message: interpolate(LENGTH_MAXIMUM, 5000)
        }
    },
    exclusion: {
        length: {
            maximum: 5000,
            message: interpolate(LENGTH_MAXIMUM, 5000)
        }
    },

    allowAppointments: {
        presence: true
    },
    appointmentsEmail: (value) => value
        ? {
            presence: {
                message: EMPTY_FIELD,
                allowEmpty: false
            },
            email: {
                message: EMAIL_FORMAT
            } ,
            length: {
                maximum: 256,
                message: interpolate(LENGTH_MAXIMUM, 256)
            }}
        : null,
    appointmentsSecureEmail: (value, attributes) => {
        let validationObj = {}

        if(value){
            validationObj = {
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
            }
        }

        if(attributes.allowAppointments){
            validationObj.presence = {
                message: EMPTY_FIELD,
                allowEmpty: false
            }
        }
        return validationObj
    },
}

class OrganizationFormMarketplaceValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new OrganizationFormMarketplaceValidator()
export default validator