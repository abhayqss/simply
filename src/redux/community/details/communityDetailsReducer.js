import { ACTION_TYPES } from 'lib/Constants'

import { getDataUrl } from 'lib/utils/Utils'
import Converter from 'lib/converters/Converter'
import factory from 'lib/converters/ConverterFactory'

import InitialState from './CommunityDetailsInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,
    CLEAR_COMMUNITY_DETAILS,
    CLEAR_COMMUNITY_DETAILS_ERROR,

    SAVE_COMMUNITY_SUCCESS,
    DOWNLOAD_COMMUNITY_LOGO_SUCCESS,

    LOAD_COMMUNITY_DETAILS_REQUEST,
    LOAD_COMMUNITY_DETAILS_SUCCESS,
    LOAD_COMMUNITY_DETAILS_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

const converter = factory.getConverter(Converter.types.BINARY_TO_BASE_64)

export default function communityDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_COMMUNITY_DETAILS:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_COMMUNITY_DETAILS_ERROR:
            return state.removeIn(['error'])

        case SAVE_COMMUNITY_SUCCESS: {
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)
        }

        case LOAD_COMMUNITY_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_COMMUNITY_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_COMMUNITY_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)

        case DOWNLOAD_COMMUNITY_LOGO_SUCCESS: {
            const {
                commId,
                mediaType
            } = action.payload

            const { data } = state
            const fileData = action.payload.data

            if (data && data.id === commId && fileData) {
                return state.setIn(['data'], {
                    ...data,
                    logoDataUrl: getDataUrl(
                        converter.convert(fileData),
                        mediaType
                    )
                })
            }
        }
    }
    return state
}
