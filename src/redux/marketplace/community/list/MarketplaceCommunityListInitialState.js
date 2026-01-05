const { Record } = require('immutable')

export default Record({
    error: null,
    isFetching: false,
    shouldReload: false,
    dataSource: Record({
        data: [],
        pagination: Record({
            page: 1,
            size: 15,
            totalCount: 0,
            isFetching: false
        })(),
        filter: Record({
            searchText: '',
            primaryFocusIds: [],
            communityTypeIds: [],
            servicesTreatmentApproachesIds: [],
            insuranceNetworkId: null,
            insurancePaymentPlanId: null
        })()
    })()
})

