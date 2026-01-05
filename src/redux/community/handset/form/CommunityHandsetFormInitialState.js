'use strict'

const { Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: false,
    isFetching: false,
    fields: Record({
        id: null,

        name: '',
        nameHasError: false,
        nameErrorText: null,

        displayName: '',
        displayNameHasError: false,
        displayNameErrorText: null,

        handsetId: '',
        handsetIdHasError: false,
        handsetIdErrorText: null,
    })()
})