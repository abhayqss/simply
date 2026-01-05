const { Record } = require('immutable')

export default Record({
    error: null,
    shouldReload: false,
    dataSource: Record({
        data: [],
    })()
})

