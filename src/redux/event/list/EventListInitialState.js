const { Record, List: _List } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        data: [],
        pagination: Record({
            page: 1,
            size: 15,
            totalCount: 0
        })(),
        filter: Record({
            clientName: '',
            eventTypeId: [],
            noteTypeId: [],
            dateFrom: '',
            dateTo: '',
            onlyIncidentReportEvents: false,

            communityIds: _List([]),
            organizationId: null,
        })()
    })()
})