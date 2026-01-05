import { ACTION_TYPES } from 'lib/Constants'

import { getDataUrl } from 'lib/utils/Utils'
import Converter from 'lib/converters/Converter'
import factory from 'lib/converters/ConverterFactory'

import InitialState from './OrganizationDetailsInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_ORGANIZATION_DETAILS,
    CLEAR_ORGANIZATION_DETAILS_ERROR,

    LOAD_ORGANIZATION_DETAILS_REQUEST,
    LOAD_ORGANIZATION_DETAILS_SUCCESS,
    LOAD_ORGANIZATION_DETAILS_FAILURE,

    DOWNLOAD_ORGANIZATION_LOGO_SUCCESS,

    SAVE_ORGANIZATION_SUCCESS
} = ACTION_TYPES


const initialState = new InitialState()

const converter = factory.getConverter(Converter.types.BINARY_TO_BASE_64)

export default function organizationDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_ORGANIZATION_DETAILS:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_ORGANIZATION_DETAILS_ERROR:
            return state.removeIn(['error'])

        case SAVE_ORGANIZATION_SUCCESS: {
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)
        }

        case LOAD_ORGANIZATION_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_ORGANIZATION_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_ORGANIZATION_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)

        case DOWNLOAD_ORGANIZATION_LOGO_SUCCESS: {
            const {
                orgId,
                mediaType
            } = action.payload

            const { data } = state
            const fileData = action.payload.data

            if (data && data.id === orgId && fileData) {
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
