import { ACTION_TYPES } from 'lib/Constants'

import { defer, allAreTrue } from 'lib/utils/Utils'

import service from 'services/CommunityService'
import legalInfoValidator from 'validators/CommunityFormLegalInfoValidator'
import marketplaceValidator from 'validators/CommunityFormMarketplaceValidator'

const {
    CLEAR_COMMUNITY_FORM,
    CLEAR_COMMUNITY_FORM_ERROR,
    CLEAR_COMMUNITY_FORM_FIELD_ERROR,

    CHANGE_COMMUNITY_FORM_TAB,

    CHANGE_COMMUNITY_FORM_FIELD,
    CHANGE_COMMUNITY_FORM_FIELDS,
    CHANGE_COMMUNITY_FORM_MARKET_PLACE_FIELD,

    VALIDATE_COMMUNITY_FORM_LEGAL_INFO,
    VALIDATE_COMMUNITY_FORM_LEGAL_INFO_FIELD,

    VALIDATE_COMMUNITY_FORM_MARKETPLACE,
    VALIDATE_COMMUNITY_FORM_AFFILIATE_RELATIONSHIP,

    VALIDATE_COMMUNITY_DATA_UNIQ_REQUEST,
    VALIDATE_COMMUNITY_DATA_UNIQ_SUCCESS,
    VALIDATE_COMMUNITY_DATA_UNIQ_FAILURE,

    SAVE_COMMUNITY_REQUEST,
    SAVE_COMMUNITY_SUCCESS,
    SAVE_COMMUNITY_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_COMMUNITY_FORM }
}

export function clearError () {
    return { type: CLEAR_COMMUNITY_FORM_ERROR }
}

export function clearFieldError (field) {
    return {
        type: CLEAR_COMMUNITY_FORM_FIELD_ERROR,
        payload: field
    }
}

export function changeTab (tab) {
    return {
        type: CHANGE_COMMUNITY_FORM_TAB,
        payload: tab
    }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_COMMUNITY_FORM_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function changeMarketplaceField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_COMMUNITY_FORM_MARKET_PLACE_FIELD,
                payload: { field, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_COMMUNITY_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

function validate (data, validator, actionType) {
    return dispatch => {
        return validator.validate(data).then(() => {
            dispatch({ type: actionType, payload: { success: true } })
            return true
        }).catch(errors => {
            dispatch({ type: actionType, payload: { success: false, errors } })
            return false
        })
    }
}

export function validateLegalInfo (data) {
    return validate(data, legalInfoValidator, VALIDATE_COMMUNITY_FORM_LEGAL_INFO)
}

export function validateMarketplace (data) {
    return validate(data, marketplaceValidator, VALIDATE_COMMUNITY_FORM_MARKETPLACE)
}

export function validateAffiliateRelationship (data) {
    return validate(data, legalInfoValidator, VALIDATE_COMMUNITY_FORM_AFFILIATE_RELATIONSHIP)
}

export function validateUniq (orgId, data) {
    return dispatch => {
        dispatch({ type: VALIDATE_COMMUNITY_DATA_UNIQ_REQUEST })
        return service.validateUniq(orgId, data).then(({ data } = {}) => {
            dispatch({ type: VALIDATE_COMMUNITY_DATA_UNIQ_SUCCESS, payload: data })

            return allAreTrue(
                data.oid !== null ? data.oid : true,
                data.name !== null ? data.name : true
            )
        }).catch(e => {
            dispatch({ type: VALIDATE_COMMUNITY_DATA_UNIQ_FAILURE, payload: e })
        })
    }
}

export function submit (orgId, community) {
    return dispatch => {
        dispatch({ type: SAVE_COMMUNITY_REQUEST })
        return service.save(orgId, community).then(response => {
            dispatch({ type: SAVE_COMMUNITY_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_COMMUNITY_FAILURE, payload: e })
            throw e
        })
    }
}
