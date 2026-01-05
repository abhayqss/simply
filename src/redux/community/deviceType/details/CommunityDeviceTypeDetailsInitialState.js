const { Record } = require('immutable')

const Details = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    data: null
})

export default Details
