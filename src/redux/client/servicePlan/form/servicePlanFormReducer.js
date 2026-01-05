import Immutable, {List} from 'immutable'

import { each } from 'underscore'

import { ACTION_TYPES } from 'lib/Constants'

import { updateServicePlanFormFieldErrors } from '../../../utils/Form'

import InitialState from './ServicePlanFormInitialState'
import NeedSectionInitialState from './NeedSectionInitialState'
import GoalSectionInitialState from './GoalSectionInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_SERVICE_PLAN_FORM,
    CLEAR_SERVICE_PLAN_FORM_ERROR,
    CLEAR_SERVICE_PLAN_FORM_FIELD_ERROR,

    CHANGE_SERVICE_PLAN_FORM_TAB,

    CHANGE_SERVICE_PLAN_FORM_FIELD,
    CHANGE_SERVICE_PLAN_FORM_FIELDS,

    VALIDATE_SERVICE_PLAN_FORM,

    SAVE_SERVICE_PLAN_REQUEST,
    SAVE_SERVICE_PLAN_SUCCESS,
    SAVE_SERVICE_PLAN_FAILURE,

    ADD_SERVICE_PLAN_ANCHOR,
    REMOVE_SERVICE_PLAN_ANCHOR,
    CHANGE_SERVICE_PLAN_ANCHORS,

    ADD_SERVICE_PLAN_FORM_NEED,
    REMOVE_SERVICE_PLAN_FORM_NEED,
    CHANGE_SERVICE_PLAN_FORM_NEED_FIELD,
    CHANGE_SERVICE_PLAN_FORM_NEED_FIELDS,
    CLEAR_SERVICE_PLAN_FORM_NEED_FIELDS,

    ADD_SERVICE_PLAN_FORM_GOAL,
    REMOVE_SERVICE_PLAN_FORM_GOAL,
    CHANGE_SERVICE_PLAN_FORM_GOAL_FIELD,
    CHANGE_SERVICE_PLAN_FORM_GOAL_FIELDS,
    CHANGE_SERVICE_PLAN_FORM_NEED_SCORE_FIELD
} = ACTION_TYPES

const initialState = new InitialState()

export default function servicePlanFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_SERVICE_PLAN_FORM:
            return state.clear()

        case CLEAR_SERVICE_PLAN_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_SERVICE_PLAN_FORM_FIELD_ERROR: {
            const field = action.payload
            return state.setIn(['fields', field + 'HasError'], false)
                .setIn(['fields', field + 'ErrorMsg'], '')
        }

        case CHANGE_SERVICE_PLAN_FORM_TAB:
            return state.setIn(['tab'], action.payload)

        case CHANGE_SERVICE_PLAN_FORM_FIELD: {
            const { field, value } = action.payload
            return state.setIn(['fields', field], value)
        }

        case CHANGE_SERVICE_PLAN_FORM_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case ADD_SERVICE_PLAN_FORM_NEED: {
            const path = ['fields', 'needs']
            const needs = state.getIn(path)

            const need = new NeedSectionInitialState({
                index: needs.size
            })

            return state.setIn(path, needs.push(need))

          /*  return state.setIn(path, [...needs, new NeedSectionInitialState({index: index})])*/
        }

        case REMOVE_SERVICE_PLAN_FORM_NEED: {
            const index = action.payload

            const path = ['fields', 'needs']
            let needs = state.getIn(path).removeIn([index])

            each (needs, (n, i) => {
                needs = needs.setIn([i, 'index'], i)
            })

            return state.setIn(path, needs)

           /* return state.setIn(path, filter(needs, o => (
                o.index !== index
            )))*/
        }

        case CHANGE_SERVICE_PLAN_FORM_NEED_FIELD: {
            const { index, field, value } = action.payload
            const path = ['fields', 'needs', index]
            const needs = state.getIn(path)

            return state.setIn(path, needs.setIn(['fields', field], value))
        }

        case CHANGE_SERVICE_PLAN_FORM_NEED_SCORE_FIELD: {
            const {index, field, value} = action.payload
            const path = ['fields', 'needs', index]
            const needs = state.getIn(path)

            /*return state.setIn(path, needs.map(need => {
             console.log(" need.setIn(['fields', 'needScore'], value)",  need.getIn(['fields', 'needScore']))
             return need.setIn(['fields', 'needScore'], value)
             }))
             */

            return state.setIn(path, needs.setIn(['fields', field], value))
        }

        case CHANGE_SERVICE_PLAN_FORM_NEED_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case CLEAR_SERVICE_PLAN_FORM_NEED_FIELDS:
            const index = action.payload
            const path = ['fields', 'needs', index]
            const need = state.getIn(path)

            return state.setIn(path, need.setIn(['fields'], new NeedSectionInitialState().fields))

        case ADD_SERVICE_PLAN_FORM_GOAL: {
            const { needIndex } = action.payload

            const needsPath = ['fields', 'needs']
            const needs = state.getIn(needsPath)

            const goalsPath = [needIndex, 'fields', 'goals']
            let goals = needs.getIn(goalsPath)

            goals = List.isList(goals) ? goals : List(goals)

            const goal = new GoalSectionInitialState({
                index: goals.size,
                needIndex: needIndex
            })

            return state.setIn(needsPath, needs.setIn(goalsPath, goals.push(goal)))

            /*return state.setIn(path,  map(needs, need => (
                (need.index === needIndex)
                    ? need.setIn(['fields','goals'],[
                        ...need.getIn(['fields','goals']),
                        new GoalSectionInitialState({index: index, needIndex: needIndex})
                        ])
                    : need
            )))*/
        }

        case REMOVE_SERVICE_PLAN_FORM_GOAL: {
            const { needIndex, index } = action.payload

            const needsPath = ['fields', 'needs']
            const needs = state.getIn(needsPath)

            const goalsPath = [needIndex, 'fields', 'goals']
            let goals = needs.getIn(goalsPath).removeIn([index])

            each (goals, (g, i) => {
                goals = goals.setIn([i, 'index'], i)
            })

            return state.setIn(needsPath, needs.setIn(goalsPath, goals))

            /*return state.setIn(needsPath, map(needs, need => {
                    if (need.index === needIndex)
                        need = need.setIn(goalsPath, filter( need.getIn(goalsPath), o => o.index !== index ))
                    return need
                }
            ))*/
        }

        case CHANGE_SERVICE_PLAN_FORM_GOAL_FIELD: {
            const { index, needIndex, field, value } = action.payload

            const needsPath = ['fields', 'needs']
            const needs = state.getIn(needsPath)

            const goalsPath = [needIndex, 'fields', 'goals']
            const goals = needs.getIn(goalsPath)

            return state.setIn(needsPath,
                needs.setIn(goalsPath,
                    goals.setIn([index, 'fields', field], value)
                )
            )
        }

        case CHANGE_SERVICE_PLAN_FORM_GOAL_FIELDS: {
            let changes = action.payload

            return state.mergeDeep(Immutable.fromJS({
                fields: changes
            }))
        }

        case VALIDATE_SERVICE_PLAN_FORM: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(path, updateServicePlanFormFieldErrors(state.getIn(path), errors), true)
        }

        case SAVE_SERVICE_PLAN_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_SERVICE_PLAN_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_SERVICE_PLAN_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
