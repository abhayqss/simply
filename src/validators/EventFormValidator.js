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

const DEFAULT_CONSTRAINT = {
    presence: {
        allowEmpty: false,
        message: EMPTY_FIELD
    },
}

const CONSTRAINTS = {
    "eventEssentials.careTeamRoleId": {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
    },
    "eventEssentials.eventDate": {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    "eventEssentials.eventTypeId": {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    "treatmentDetails.hasTreatingPhysician": {
        presence: true
    },
    "treatmentDetails.treatingPhysicianDetails.firstName": (value, attributes) =>
        attributes.treatmentDetails.hasTreatingPhysician
            ? {
            presence: {
                allowEmpty: false,
                message: EMPTY_FIELD
            },
            length: {
                minimum: 2,
                message: interpolate(LENGTH_MINIMUM, 2)
            }
        } : null
    ,
    "treatmentDetails.treatingPhysicianDetails.lastName": (value, attributes) =>
        attributes.treatmentDetails.hasTreatingPhysician
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    minimum: 2,
                    message: interpolate(LENGTH_MINIMUM, 2)
                }
            } : null
    ,
    "treatmentDetails.treatingPhysicianDetails.hasAddress": (value, attributes) =>
        attributes.treatmentDetails.hasTreatingPhysician
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
            } : null
    ,
    "treatmentDetails.treatingPhysicianDetails.address.street": (value, attributes) =>
        attributes.treatmentDetails.treatingPhysicianDetails.hasAddress
            ? {
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
            } : null
    ,
    "treatmentDetails.treatingPhysicianDetails.address.city": (value, attributes) =>
        attributes.treatmentDetails.treatingPhysicianDetails.hasAddress
            ? DEFAULT_CONSTRAINT
            : null
    ,
    "treatmentDetails.treatingPhysicianDetails.address.stateId": (value, attributes) =>
        attributes.treatmentDetails.treatingPhysicianDetails.hasAddress
            ? DEFAULT_CONSTRAINT
            : null
    ,
    "treatmentDetails.treatingPhysicianDetails.address.zip": (value, attributes) =>
        attributes.treatmentDetails.treatingPhysicianDetails.hasAddress
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    is: 5,
                    message: interpolate(LENGTH_MAXIMUM, 5)
                },
                numericality: {
                    notValid: NUMBER_FORMAT
                }
            } : null
    ,
    "treatmentDetails.hasHospital": {
        presence: true
    },
    "treatmentDetails.treatingHospitalDetails.name": (value, attributes) =>
        attributes.treatmentDetails.hasHospital
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    minimum: 2,
                    message: interpolate(LENGTH_MINIMUM, 2)
                }
            } : null
    ,
    "treatmentDetails.treatingHospitalDetails.hasAddress": (value, attributes) =>
        attributes.treatmentDetails.hasHospital
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
            } : null
    ,
    "treatmentDetails.treatingHospitalDetails.address.street": (value, attributes) =>
        attributes.treatmentDetails.treatingHospitalDetails.hasAddress
            ? {
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
            } : null
    ,
    "treatmentDetails.treatingHospitalDetails.address.city": (value, attributes) =>
        attributes.treatmentDetails.treatingHospitalDetails.hasAddress
            ? DEFAULT_CONSTRAINT
            : null
    ,
    "treatmentDetails.treatingHospitalDetails.address.stateId": (value, attributes) =>
        attributes.treatmentDetails.treatingHospitalDetails.hasAddress
            ? DEFAULT_CONSTRAINT
            : null
    ,
    "treatmentDetails.treatingHospitalDetails.address.zip": (value, attributes) =>
        attributes.treatmentDetails.treatingHospitalDetails.hasAddress
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    is: 5,
                    message: interpolate(LENGTH_MAXIMUM, 5)
                },
                numericality: {
                    notValid: NUMBER_FORMAT
                }
            } : null
    ,
    hasResponsibleManager: {
        presence: true
    },
    "responsibleManager.firstName": (value, attributes) =>
        attributes.hasResponsibleManager
        ? {
            presence: {
                allowEmpty: false,
                message: EMPTY_FIELD
            },
            length: {
                minimum: 2,
                message: interpolate(LENGTH_MINIMUM, 2)
            }
        } : null
    ,
    "responsibleManager.lastName": (value, attributes) =>
        attributes.hasResponsibleManager
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    minimum: 2,
                    message: interpolate(LENGTH_MINIMUM, 2)
                }
            } : null
    ,
    hasRegisteredNurse: {
        presence: true
    },
    "registeredNurse.firstName": (value, attributes) =>
        attributes.hasRegisteredNurse
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    minimum: 2,
                    message: interpolate(LENGTH_MINIMUM, 2)
                }
            } : null
    ,
    "registeredNurse.lastName": (value, attributes) =>
        attributes.hasRegisteredNurse
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    minimum: 2,
                    message: interpolate(LENGTH_MINIMUM, 2)
                }
            } : null
    ,
    "registeredNurse.hasAddress": (value, attributes) =>
        attributes.hasRegisteredNurse
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
            } : null
    ,
    "registeredNurse.address.street": (value, attributes) =>
        attributes.registeredNurse.hasAddress
            ? {
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
            } : null
    ,
    "registeredNurse.address.city": (value, attributes) =>
        attributes.registeredNurse.hasAddress
            ? DEFAULT_CONSTRAINT
            : null
    ,
    "registeredNurse.address.stateId": (value, attributes) =>
        attributes.registeredNurse.hasAddress
            ? DEFAULT_CONSTRAINT
            : null
    ,
    "registeredNurse.address.zip": (value, attributes) =>
        attributes.registeredNurse.hasAddress
            ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
                length: {
                    is: 5,
                    message: interpolate(LENGTH_MAXIMUM, 5)
                },
                numericality: {
                    notValid: NUMBER_FORMAT
                }
            } : null
}

class EventFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new EventFormValidator()
export default validator