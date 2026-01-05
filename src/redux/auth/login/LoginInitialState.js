const {Record} = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    user: Record({
        data: null
    })()
})
