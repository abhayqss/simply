import InitialState from './OrganizationTypeListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_ORGANIZATION_TYPE_LIST,
    LOAD_ORGANIZATION_TYPE_LIST_SUCCESS,
    LOAD_ORGANIZATION_TYPE_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function organizationTypeListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_ORGANIZATION_TYPE_LIST:
            return state
                .setIn(['dataSource','data'], [])
                .removeIn(['error'])

        case LOAD_ORGANIZATION_TYPE_LIST_SUCCESS: {
            const { data } = action.payload

            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_ORGANIZATION_TYPE_LIST_FAILURE:
            return state
                .setIn(['error'], action.payload)
    }

    return state
}
