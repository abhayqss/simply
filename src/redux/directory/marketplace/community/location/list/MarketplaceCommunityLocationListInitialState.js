const { Record } = require('immutable')

export default Record({
    error: null,
    dataSource: Record({
        data: []
    })()
})