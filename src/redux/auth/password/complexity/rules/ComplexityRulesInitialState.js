const { Record } = require('immutable')

const rules = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    data: null
})

export default rules