const { Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: true,
    isFetching: false,
    fields: new Record({
        id: null,

        organization: '',
        organizationHasError: false,
        organizationErrorText: '',

        community: '',
        communityHasError: false,
        communityErrorText: '',

        name: '',
        nameHasError: false,
        nameErrorText: '',

        email: '',
        emailHasError: false,
        emailErrorText: '',

        serviceIds: [],
        serviceIdsHasError: false,
        serviceIdsErrorText: '',

        phone: '',
        phoneHasError: false,
        phoneErrorText: '',

        isUrgentCare: false,
        isUrgentCareHasError: false,
        isUrgentCareErrorText: '',

        appointmentDate: null,
        appointmentDateHasError: false,
        appointmentDateErrorText: '',

        comment: '',
        commentHasError: false,
        commentErrorText: '',
    })()
})