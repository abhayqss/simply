const { Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isFetching: false,

    isValid: true,
    isValidLegalInfoTab: true,
    isValidMarketplaceTab: true,

    fields: Record({
        id: null,

        name: '',
        nameHasError: false,
        nameErrorText: '',

        oid: '',
        oidHasError: false,
        oidErrorText: '',

        companyId: '',
        companyIdHasError: false,
        companyIdErrorText: '',

        email: '',
        emailHasError: false,
        emailErrorText: '',

        phone: '',
        phoneHasError: false,
        phoneErrorText: '',

        street: '',
        streetHasError: false,
        streetErrorText: '',

        city: '',
        cityHasError: false,
        cityErrorText: '',

        stateId: null,
        stateIdHasError: false,
        stateIdErrorText: '',

        zipCode: '',
        zipCodeHasError: false,
        zipCodeErrorText: '',

        logo: null,
        logoHasError: false,
        logoErrorText: '',

        logoName: '',

        copyEventNotificationsForPatients: null,

        marketplace: Record({
            id: null,

            confirmVisibility: false,

            prerequisite: '',
            prerequisiteHasError: false,
            prerequisiteErrorText: '',

            exclusion: '',
            exclusionHasError: false,
            exclusionErrorText: '',

            appointmentsEmail: '',
            appointmentsEmailHasError: false,
            appointmentsEmailErrorText: '',

            appointmentsSecureEmail: '',
            appointmentsSecureEmailHasError: false,
            appointmentsSecureEmailErrorText: '',

            servicesSummaryDescription: '',
            servicesSummaryDescriptionHasError: false,
            servicesSummaryDescriptionErrorText: '',

            primaryFocusIds: [],
            primaryFocusIdsHasError: false,
            primaryFocusIdsErrorText: '',

            communityTypeIds: [],
            communityTypeIdsHasError: false,
            communityTypeIdsErrorText: '',

            levelOfCareIds: [],
            levelOfCareIdsHasError: false,
            levelOfCareIdsErrorText: '',

            ageGroupIds: [],
            ageGroupIdsHasError: false,
            ageGroupIdsErrorText: '',

            serviceTreatmentApproachIds: [],
            serviceTreatmentApproachIdsHasError: false,
            serviceTreatmentApproachIdsErrorText: '',

            emergencyServiceIds: [],
            emergencyServiceIdsHasError: false,
            emergencyServiceIdsErrorText: '',

            languageServiceIds: [],
            languageServiceIdsHasError: false,
            languageServiceIdsErrorText: '',

            additionalServiceIds: [],
            additionalServiceIdsHasError: false,
            additionalServiceIdsErrorText: '',

            insuranceNetworkIds: [],
            insuranceNetworkIdsHasError: false,
            insuranceNetworkIdsErrorText: '',

            insurancePaymentPlanIds: [],
            insurancePaymentPlanIdsHasError: false,
            insurancePaymentPlanIdsErrorText: '',

            allInsurancesAccepted: false,
            allInsurancesAcceptedHasError: false,
            allInsurancesAcceptedErrorText: '',

            allowAppointments: false, //This Name Has to be changed , but using it for backend integration
        })()
    })()
})
