const { Record } = require('immutable')

export default Record({
    error: null,
    shouldReload: true,
    dataSource: Record({
        data: []
    })()
})