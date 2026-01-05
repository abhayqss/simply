import { ACTION_TYPES } from 'lib/Constants'

import { change } from 'redux/error/errorActions'

const {
    SAVE_SERVICE_PLAN_FAILURE
} = ACTION_TYPES

const errorHandlerMiddleware = store => next => action => {
    const { type, payload } = action;

    switch (type) {
        case SAVE_SERVICE_PLAN_FAILURE:
            store.dispatch(change(payload))
            break;

        default:
            break;
    }

    return next(action);
}

export default errorHandlerMiddleware