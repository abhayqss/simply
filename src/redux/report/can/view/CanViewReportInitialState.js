'use strict'

const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    value: false
})
