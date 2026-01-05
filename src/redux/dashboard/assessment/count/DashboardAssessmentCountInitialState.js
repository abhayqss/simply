'use strict'

const { Record } = require('immutable')

const Count = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        data: [],
    })()
})

export default Count