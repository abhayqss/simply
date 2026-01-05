import { ACTION_TYPES } from 'lib/Constants'

const {
    UPDATE_SIDE_BAR
} = ACTION_TYPES

export function update (changes) {
    return { type: UPDATE_SIDE_BAR, payload: changes }
}