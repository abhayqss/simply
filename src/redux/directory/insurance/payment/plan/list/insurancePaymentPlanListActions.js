import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_INSURANCE_PAYMENT_PLAN_LIST,
    LOAD_INSURANCE_PAYMENT_PLAN_LIST_REQUEST,
    LOAD_INSURANCE_PAYMENT_PLAN_LIST_SUCCESS,
    LOAD_INSURANCE_PAYMENT_PLAN_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_INSURANCE_PAYMENT_PLAN_LIST }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_INSURANCE_PAYMENT_PLAN_LIST_REQUEST })

        return service.findInsurancePaymentPlans(params).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_INSURANCE_PAYMENT_PLAN_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({
                type: LOAD_INSURANCE_PAYMENT_PLAN_LIST_FAILURE,
                payload: e
            })
        })
    }
}

