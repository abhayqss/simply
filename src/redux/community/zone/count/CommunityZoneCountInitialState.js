const { Record } = require('immutable')

const Count = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    value: null
})

export default Count
