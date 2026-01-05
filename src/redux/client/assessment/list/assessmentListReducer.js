import Immutable from 'immutable'

import InitialState from './AssessmentListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_ASSESSMENT_LIST_ERROR,

    CLEAR_ASSESSMENT_LIST,
    CLEAR_ASSESSMENT_LIST_FILTER,
    CHANGE_ASSESSMENT_LIST_FILTER,

    LOAD_ASSESSMENT_LIST_REQUEST,
    LOAD_ASSESSMENT_LIST_SUCCESS,
    LOAD_ASSESSMENT_LIST_FAILURE,

    CHANGE_ASSESSMENT_LIST_SORTING
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function assessmentListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_ASSESSMENT_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .setIn(['dataSource', 'sorting', 'field'], '')
                .setIn(['dataSource', 'sorting', 'order'], '')
                .removeIn(['dataSource', 'filter', 'name'])

        case CLEAR_ASSESSMENT_LIST_ERROR:
            return state.removeIn(['error'])

        case CHANGE_ASSESSMENT_LIST_SORTING: {
            const {
                field, order
            } = action.payload

            return state
                .setIn(['shouldReload'], true)
                .setIn(['dataSource', 'sorting', 'field'], field)
                .setIn(['dataSource', 'sorting', 'order'], order)
        }

        case CLEAR_ASSESSMENT_LIST_FILTER:
            return state.removeIn(['dataSource', 'filter', 'name'])

        case CHANGE_ASSESSMENT_LIST_FILTER: {
            const { changes, shouldReload = true } = action.payload

            if (changes) {
                return state
                    .mergeIn(['dataSource', 'filter'], Immutable.fromJS(changes))
                    .setIn(['shouldReload'], shouldReload)
            }

            break
        }

        case LOAD_ASSESSMENT_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_ASSESSMENT_LIST_SUCCESS: {
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

        case LOAD_ASSESSMENT_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
