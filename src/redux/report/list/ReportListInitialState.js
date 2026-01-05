const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        filter: Record({
            organizationId: null,
            communityIds: [],
            reportType: null,
            fromDate: null,
            toDate: null
        })()
    })()
})