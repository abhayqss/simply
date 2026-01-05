import Immutable from 'immutable'

import InitialState from './CareTeamMemberListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CARE_TEAM_MEMBER_LIST_ERROR,

    CLEAR_CARE_TEAM_MEMBER_LIST,
    CLEAR_CARE_TEAM_MEMBER_LIST_FILTER,
    CHANGE_CARE_TEAM_MEMBER_LIST_FILTER,

    LOAD_CARE_TEAM_MEMBER_LIST_REQUEST,
    LOAD_CARE_TEAM_MEMBER_LIST_SUCCESS,
    LOAD_CARE_TEAM_MEMBER_LIST_FAILURE,

    SAVE_CARE_TEAM_MEMBER_SUCCESS
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function careTeamMemberListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CARE_TEAM_MEMBER_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .removeIn(['dataSource', 'filter', 'name'])

        case CLEAR_CARE_TEAM_MEMBER_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CARE_TEAM_MEMBER_LIST_FILTER:
            return state.removeIn(['dataSource', 'filter', 'name'])

        case CHANGE_CARE_TEAM_MEMBER_LIST_FILTER: {
            const { changes, shouldReload = true } = action.payload

            if (changes) {
                return state
                    .mergeIn(['dataSource', 'filter'], Immutable.fromJS(changes))
                    .setIn(['shouldReload'], shouldReload)
            }

            break
        }

        case SAVE_CARE_TEAM_MEMBER_SUCCESS: {
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)
        }

        case LOAD_CARE_TEAM_MEMBER_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_CARE_TEAM_MEMBER_LIST_SUCCESS: {
            const {
                data,
                page,
                size,
                totalCount
            } = action.payload

            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['dataSource', 'data'], data)
                .setIn(['dataSource', 'pagination', 'page'], page)
                .setIn(['dataSource', 'pagination', 'size'], size)
                .setIn(['dataSource', 'pagination', 'totalCount'], totalCount)
        }

        case LOAD_CARE_TEAM_MEMBER_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
