const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        data: [],
    })()
})