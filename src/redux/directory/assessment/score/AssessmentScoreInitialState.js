const { Record } = require('immutable')

const Scoring = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    value: null
})

export default Scoring
