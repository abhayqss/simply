import {
    map,
    each,
    last,
    without,
    isArray,
    isEmpty,
    includes,
    isObject
} from 'underscore'

import { omitDeep } from 'lib/utils/Utils'

const Immutable = require('immutable')

/*
export function clearFieldErrors (fields) {
    return fields.clear().mergeDeep(
        omitDeep(fields.toJS(), (v, k) => (
            k.includes('HasError')
            || k.includes('ErrorCode')
            || k.includes('ErrorText')
        ))
    )
}
*/

export function clearFieldErrors (fields) {
    const it = fields.entries()

    let entry = it.next();

    while (!entry.done) {
        const [k, v] = entry.value

        if (k.includes('HasError')
            || k.includes('ErrorCode')
            || k.includes('ErrorText')) {
            fields = fields.remove(k)
        }

        if (Immutable.Record.isRecord(v)) {
            fields = fields.set(k, clearFieldErrors(v))
        }

        entry = it.next();
    }

    return fields
}

export function updateFieldErrors (fields, errors, isServicePlan) {
    fields = isServicePlan ? fields : clearFieldErrors(fields)

    each(errors, (errors, fieldName) => {
        const nestedFields = fieldName.split('.')
        const isFieldObject = includes(fieldName, '.')

        const lastElement = last(nestedFields)
        const restElements = without(nestedFields, lastElement)

        fields = isFieldObject
            ? fields
                .setIn([...restElements, `${lastElement}HasError`], true)
                .setIn([...restElements, `${lastElement}ErrorText`], errors[0])
            : fields
                .setIn([`${fieldName}HasError`], true)
                .setIn([`${fieldName}ErrorText`], errors[0])
    })

    return fields
}

/**
 * @param fields
 This function is specifically for Service Plan Form Validation
 This can also be shifted to another file
 */
function clearNestedFieldErrorsOfServicePlanForm (fields) {
    each(fields.toJS(), (v, n) => {
        if (!isEmpty(v) && isArray(v)) {
            map(v, (need, i) => {
                each(need.fields, (v1, n1) => {
                    if (!isEmpty(v1) && isArray(v1)) {
                        map(v1, (goal, j) => {
                            each(goal.fields, (v2, n2) => {
                                if (n2.includes('HasError')) fields = fields.setIn([n, i, 'fields', n1, j, 'fields', n2,], false)
                                if (n2.includes('ErrorText')) fields = fields.setIn([n, i, 'fields', n1, j, 'fields', n2,], '')
                            })
                        })
                    }

                    if (n1.includes('HasError')) fields = fields.setIn([n, i, 'fields', n1], false)
                    if (n1.includes('ErrorText')) fields = fields.setIn([n, i, 'fields', n1], '')
                })
            })
        }

        if (n.includes('HasError')) fields = fields.setIn([n], false)
        if (n.includes('ErrorText')) fields = fields.setIn([n], '')

    })

    return fields
}

/**
 * @param fields
 * @param errors
 * @param isServicePlan
 This function is specifically for Service Plan Form Validation
 This can also be shifted to another file
 */
export function updateServicePlanFormFieldErrors (fields, errors, isServicePlan) {
    fields = clearNestedFieldErrorsOfServicePlanForm(fields)

    return updateFieldErrors(fields, errors, isServicePlan)
}