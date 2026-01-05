import _ from 'underscore'

import { VALIDATION_ERROR_TEXTS } from 'lib/Constants'

const { EMPTY_FIELD } = VALIDATION_ERROR_TEXTS

export default function (state) {
    let nextState = state
    let isValid = true

    _.each(nextState.fields.toJS(), (v, k) => {
        if (!k.includes('Error') && !v) {
            isValid = false

            nextState = nextState
                .setIn(['fields', k + 'HasError'], true)
                .setIn(['fields', k + 'ErrorText'], EMPTY_FIELD)
        }
    })

    return nextState.setIn(['isValid'], isValid)
}