import BaseFormValidator from "./BaseFormValidator";

import { interpolate } from 'lib/utils/Utils'
import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

import {each} from 'underscore'

const {
    EMPTY_FIELD,
    LENGTH_MAXIMUM,
} = VALIDATION_ERROR_TEXTS

/*Please Tell, How we can more refactor it*/
class ServicePlanFormValidator extends BaseFormValidator {
    validate (data, domain) {
        let constraints = {
            dateCreated: {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                }
            },
            createdBy: {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                }
            },
        }

        each(data.needs, (need, i) => {
            constraints['needs.' + i + '.fields' + '.domainId'] = {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                }
            }

            constraints['needs.' + i + '.fields' + '.priorityId'] = {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                }
            }

            constraints['needs.' + i + '.fields' + '.needOpportunity'] = (value, attributes, attributeName, options) =>
                !(options.domain.id === need.fields.domainId)
                    ? {
                    presence: {
                        allowEmpty: false,
                        message: EMPTY_FIELD
                    },
                    length: {
                        maximum: 256,
                        tooLong: interpolate(LENGTH_MAXIMUM, 256)
                    }
                } : null

            constraints['needs.' + i + '.fields' + '.activationOrEducationTask'] = (value, attributes, attributeName, options) =>
                (options.domain.id === need.fields.domainId)
                    ? {
                        presence: {
                            allowEmpty: false,
                            message: EMPTY_FIELD
                        },
                        length: {maximum: 256,
                            tooLong: interpolate(LENGTH_MAXIMUM, 256)
                        }
                    } : null

            constraints['needs.' + i + '.fields' + '.proficiencyGraduationCriteria'] = {
                length: {
                    maximum: 5000,
                    tooLong: interpolate(LENGTH_MAXIMUM, 5000)
                }
            }

            constraints['needs.' + i + '.fields' + '.targetCompletionDate'] = (value, attributes, attributeName, options) =>
                (options.domain.id === need.fields.domainId)
                ? {
                presence: {
                    allowEmpty: false,
                    message: EMPTY_FIELD
                },
            } : null

            each(need.fields.goals, (goal, j) => {
                constraints['needs.' + i + '.fields' + '.goals.' + j + '.fields' + '.goal'] = {
                    presence: {
                        allowEmpty: false,
                        message: EMPTY_FIELD
                    },
                    length: {
                        maximum: 256,
                        tooLong: interpolate(LENGTH_MAXIMUM, 256)
                    }
                }

                constraints['needs.' + i + '.fields' + '.goals.' + j + '.fields' + '.barriers'] = {
                    length: {
                        maximum: 5000,
                        tooLong: interpolate(LENGTH_MAXIMUM, 5000)
                    }
                }

                constraints['needs.' + i + '.fields' + '.goals.' + j + '.fields' + '.interventionAction'] = {
                    length: {
                        maximum: 5000,
                        tooLong: interpolate(LENGTH_MAXIMUM, 5000)
                    }
                }

                constraints['needs.' + i + '.fields' + '.goals.' + j + '.fields' + '.resourceName'] = {
                    length: {
                        maximum: 256,
                        tooLong: interpolate(LENGTH_MAXIMUM, 256)
                    }
                }

                constraints['needs.' + i + '.fields' + '.goals.' + j + '.fields' + '.targetCompletionDate'] = {
                    presence: {
                        allowEmpty: false,
                        message: EMPTY_FIELD
                    }
                }
            })
        })

        return super.validate(data, constraints, {fullMessages: false, domain})
    }
}

const validator = new ServicePlanFormValidator()
export default validator