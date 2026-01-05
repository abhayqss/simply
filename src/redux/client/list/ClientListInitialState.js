const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        data: [],
        sorting: Record({
            field: 'firstName',
            order: 'asc'
        })(),
        pagination: Record({
            sort: '',
            page: 1,
            size: 15,
            totalCount: 0
        })(),
        filter: Record({
            communityIds: [],
            organizationId: null,

            ssnLast4: null,
            genderId: null,
            lastName: null,
            firstName: null,
            birthDate: null,
            recordStatus: null,
            programStatuses: []
        })()
    })()
})

