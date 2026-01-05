const { Record } = require('immutable')

export default Record({
    isFetching: false,
    fields: Record({
        firstName: null
    })()
})


