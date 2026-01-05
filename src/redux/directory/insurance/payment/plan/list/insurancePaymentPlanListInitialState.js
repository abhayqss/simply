const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: true,
    dataSource: Record({
        data: [],
    })()
})

