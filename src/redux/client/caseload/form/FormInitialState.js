const { Record } = require('immutable')

export default Record({
    index: 0,
    error: null,
    isValid: true,
    isFetching: false,
    list: Record({
        error: null,
        isFetching: false,
        shouldReload: false,
        dataSource: Record({
            data: [],
            pagination: Record({
                page: 1,
                size: 5,
                totalCount: 0
            })(),
            filter: Record({
                name: ''
            })()
        })()
    })(),
    fields: new Record({
        id: null,

        /*General Data*/
        organization: '',
        organizationHasError: false,
        organizationErrorText: '',

        community: '',
        communityHasError: false,
        communityErrorText: '',

        caseloadName: '',
        caseloadNameHasError: false,
        caseloadNameErrorText: '',

        active: false,
        activeHasError: false,
        activeErrorText: '',

        description: '',
        descriptionHasError: false,
        descriptionErrorText: '',

        serviceCoordinator: '',
        serviceCoordinatorHasError: false,
        serviceCoordinatorErrorText: '',

        backupPerson: '',
        backupPersonHasError: false,
        backupPersonErrorText: '',
    })(),
})