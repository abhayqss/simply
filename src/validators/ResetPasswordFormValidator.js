import BaseFormValidator from "./BaseFormValidator";

import {isEmpty} from 'underscore'

import { interpolate, convertFileSize } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS, ALLOWED_FILE_FORMAT_MIME_TYPES } from 'lib/Constants'

const {GIF, JPG, PNG} = ALLOWED_FILE_FORMAT_MIME_TYPES

const FILE_TYPES = [GIF, JPG, PNG]

const ALLOWED_FILE_SIZE = 1

const {
    EMPTY_FIELD,
    EMAIL_FORMAT,
    LENGTH_MAXIMUM,
} = VALIDATION_ERROR_TEXTS

const CONSTRAINTS = {
    companyId: {
        presence: {
            allowEmpty: false,
            message: EMPTY_FIELD
        },
        length: {
            maximum: 10,
            message: interpolate(LENGTH_MAXIMUM, 10)
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

class ResetPasswordFormValidator extends BaseFormValidator {
    validate (data) {
        return super.validate(data, CONSTRAINTS, {fullMessages: false})
    }
}

const validator = new ResetPasswordFormValidator()
export default validator