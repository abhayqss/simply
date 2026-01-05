const { Record } = require('immutable')

const Scoring = Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    data: null
})

export default Scoring
