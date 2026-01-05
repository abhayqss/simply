const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        data: [],
        sorting: Record({
            field: '',
            order: ''
        })(),
        pagination: Record({
            page: 1,
            size: 15,
            totalCount: 0
        })(),
        filter: Record({
            name: ''
        })()
    })()
})