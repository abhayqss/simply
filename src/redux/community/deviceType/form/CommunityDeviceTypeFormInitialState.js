'use strict'

const { Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: false,
    isFetching: false,
    fields: Record({
        id: null,

        type: '',
        typeHasError: false,
        typeErrorText: null,

        workflow: '',
        workflowHasError: false,
        workflowErrorText: null,

        autoCloseInterval: '',
        autoCloseIntervalHasError: false,
        autoCloseIntervalErrorText: null,

        deviceEnabled: false,
        deviceEnabledHasError: false,
        deviceEnabledErrorText: null,
    })()
})