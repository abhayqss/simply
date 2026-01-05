import { ACTION_TYPES } from 'lib/Constants'
import TokenInitialState from './TokenInitialState'

const {
    VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_SUCCESS,
    VALIDATE_TOKEN_FAILURE,
    REMOVE_TOKEN_REQUEST,
    REMOVE_TOKEN_SUCCESS
} = ACTION_TYPES

const initialState = new TokenInitialState()

export default function authReducer (state = initialState, action) {
    if (!(state instanceof TokenInitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case VALIDATE_TOKEN_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['error'], null)

        case VALIDATE_TOKEN_SUCCESS: {
            return state.setIn(['isFetching'], false)
                .setIn(['isValid'], true)
        }

        case VALIDATE_TOKEN_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)


        case REMOVE_TOKEN_REQUEST:
        case REMOVE_TOKEN_SUCCESS:
            return state
    }

    return state
}
