import InitialState from './MarketplaceCommunityListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'
import Immutable from 'immutable'

const {
    CLEAR_MARKETPLACE_COMMUNITY_LIST_ERROR,

    CLEAR_MARKETPLACE_COMMUNITY_LIST,
    CLEAR_MARKETPLACE_COMMUNITY_LIST_FILTER,
    CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER,
    CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER_FIELD,

    LOAD_MARKETPLACE_COMMUNITY_LIST_REQUEST,
    LOAD_MARKETPLACE_COMMUNITY_LIST_SUCCESS,
    LOAD_MARKETPLACE_COMMUNITY_LIST_FAILURE
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function marketplaceCommunityListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_MARKETPLACE_COMMUNITY_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .setIn(['dataSource', 'filter', 'searchText'], '')
                .setIn(['dataSource', 'filter', 'primaryFocusIds'], [])
                .setIn(['dataSource', 'filter', 'communityTypeIds'], [])
                .setIn(['dataSource', 'filter', 'servicesTreatmentApproachesIds'], [])
                .removeIn(['dataSource', 'filter', 'insuranceNetworkId'])
                .removeIn(['dataSource', 'filter', 'insurancePaymentPlanId'])


        case CLEAR_MARKETPLACE_COMMUNITY_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_MARKETPLACE_COMMUNITY_LIST_FILTER: {
            const { shouldReload = true } = action.payload

            return state
                .setIn(['shouldReload'], shouldReload)
                .removeIn(['dataSource', 'filter', 'ssn'])
                .setIn(['dataSource', 'filter', 'searchText'], '')
                .setIn(['dataSource', 'filter', 'primaryFocusIds'], [])
                .setIn(['dataSource', 'filter', 'communityTypeIds'], [])
                .setIn(['dataSource', 'filter', 'servicesTreatmentApproachesIds'], [])
                .removeIn(['dataSource', 'filter', 'insuranceNetworkId'])
                .removeIn(['dataSource', 'filter', 'insurancePaymentPlanId'])
        }

        case CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER: {
            const { changes, shouldReload = true } = action.payload

            if (changes) {
                return state
                    .mergeIn(['dataSource', 'filter'], changes)
                    .setIn(['shouldReload'], shouldReload)
            }

            break
        }

        case CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER_FIELD: {
            const { name, value, shouldReload = true } = action.payload

            return state
                .setIn(['dataSource', 'filter', name], value)
                .setIn(['shouldReload'], shouldReload)
        }

        case LOAD_MARKETPLACE_COMMUNITY_LIST_REQUEST: {
            let nextState = state.setIn(['error'], null)
                                 .setIn(['shouldReload'], false)

            const { page, shouldAccumulate } = action.payload

            return !shouldAccumulate || page === FIRST_PAGE ? nextState.setIn(['isFetching'], true)
                : nextState.setIn(['dataSource', 'pagination', 'isFetching'], true)
        }

        case LOAD_MARKETPLACE_COMMUNITY_LIST_SUCCESS: {
            const {
                page,
                size,
                totalCount,
                shouldAccumulate
            } = action.payload

            let nextState = state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['dataSource', 'pagination', 'page'], page)
                .setIn(['dataSource', 'pagination', 'size'], size)
                .setIn(['dataSource', 'pagination', 'totalCount'], totalCount)
                .setIn(['dataSource', 'pagination', 'isFetching'], false)

            let data = action.payload.data
            const prevData = state.getIn(['dataSource', 'data']) || []
            data = !shouldAccumulate || page === FIRST_PAGE ? data : [...prevData, ...data]

            return nextState.setIn(['dataSource', 'data'], data)
        }

        case LOAD_MARKETPLACE_COMMUNITY_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
