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

        sound: '',
        soundHasError: false,
        soundErrorText: null,

        soundCount: '',
        soundCountHasError: false,
        soundCountErrorText: null,

        soundInterval: '',
        soundIntervalHasError: false,
        soundIntervalErrorText: null,
    })()
})