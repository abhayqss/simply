const { Record } = require('immutable')

const Delete = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    data: null
})

export default Delete