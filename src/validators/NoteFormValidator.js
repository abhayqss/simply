import BaseFormValidator from "./BaseFormValidator";

import {contains} from 'underscore'

import {interpolate} from 'lib/utils/Utils'
import {VALIDATION_ERROR_TEXTS} from 'lib/Constants'

const {
    EMPTY_FIELD,
    LENGTH_MINIMUM,
    LENGTH_MAXIMUM,
} = VALIDATION_ERROR_TEXTS

const DEFAULT_CONSTRAINT = {
    presence: {
        allowEmpty: false,
        message: EMPTY_FIELD
    },
}

const CONSTRAINTS = {
    personSubmittingNote: {
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
    subTypeId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    lastModifiedDate: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        }
    },
    admitDate: (value, attributes, attributeName, options) =>
        contains(options.careManagement, attributes.subTypeId)
            ? DEFAULT_CONSTRAINT
            : null
    ,
    encounterNoteTypeId: (value, attributes, attributeName, options) =>
        contains(options.encounter, attributes.subTypeId)
            ? DEFAULT_CONSTRAINT
            : null
    ,
    encounterDate: (value, attributes, attributeName, options) =>
        contains(options.encounter, attributes.subTypeId)
            ? DEFAULT_CONSTRAINT
            : null
    ,
    from: (value, attributes, attributeName, options) =>
        contains(options.encounter, attributes.subTypeId)
            ? DEFAULT_CONSTRAINT
            : null
    ,
    to: (value, attributes, attributeName, options) =>
        contains(options.encounter, attributes.subTypeId)
            ? DEFAULT_CONSTRAINT
            : null
    ,
    subjective: {
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

class NoteFormValidator extends BaseFormValidator {
    validate (data, options) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false, ...options})
    }
}

const validator = new NoteFormValidator()
export default validator