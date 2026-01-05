const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    dataSource: Record({
        data: [],
    })()
})

