import validate from 'validate.js'
import { each, isEmpty } from 'underscore'

validate.validators.email.PATTERN = /^([a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,})?$/i

validate.validators.each = function (items, constrains) {
    const errors = []

    each(items, o => {
        const error = validate(o, constrains, { fullMessages: false })
        if (error) errors.push(error)
    })

    return !isEmpty(errors) ? errors : null
}

validate.validators.optional = (value, options) => {
    return !isEmpty(value) ? validate.single(value, options) : null
}

export default class BaseFormValidator {
    validate (data, constraints, options) {
       /* if (excluded) constraints = omit(constraints, excluded)*/

        return validate.async(data, constraints, options)
    }
}