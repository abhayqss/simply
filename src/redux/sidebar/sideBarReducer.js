import { ACTION_TYPES } from 'lib/Constants'
import SideBarInitialState from './SideBarInitialState'

const {
    LOGOUT_SUCCESS,

    CLEAR_ALL_AUTH_DATA,

    UPDATE_SIDE_BAR
} = ACTION_TYPES

const initialState = new SideBarInitialState()

export default function sideBarReducer (state = initialState, action) {
    if (!(state instanceof SideBarInitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
            return state.clear()

        case UPDATE_SIDE_BAR: {
            return state.merge(action.payload)
        }
    }

    return state
}
