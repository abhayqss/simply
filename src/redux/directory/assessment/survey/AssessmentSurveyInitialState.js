'use strict'

const { Record } = require('immutable')

const Survey = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    value: null
})

export default Survey
