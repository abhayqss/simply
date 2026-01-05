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
            page: 1,
            size: 15,
            totalCount: 0
        })(),
        filter: Record({
            communityIds: [],
            organizationId: null,
            excludeWithoutCommunity: null,
            excludeWithoutSystemRole: null,

            email: '',
            lastName: '',
            firstName: '',
            statuses: [],
            systemRoleIds: []
        })()
    })()
})