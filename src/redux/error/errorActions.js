import { ACTION_TYPES } from 'lib/Constants'

const {
    CHANGE_ERROR,
    CLEAR_ERROR
} = ACTION_TYPES

export function change (error) {
    return { type: CHANGE_ERROR, payload: error }
}

export function clear () {
    return { type: CLEAR_ERROR }
}
