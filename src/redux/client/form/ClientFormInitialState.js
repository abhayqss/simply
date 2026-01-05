const { Record } = require('immutable')

export default Record({
    error: null,
    isValid: true,
    isValidated: false,
    isFetching: false,
    fields: Record({
        id: null,

        isActive: true,

        legacyId: null,

        /*Demographics*/
        firstName: null,
        firstNameHasError: false,
        firstNameErrorText: null,

        lastName: null,
        lastNameHasError: false,
        lastNameErrorText: null,

        ssn: null,
        ssnHasError: false,
        ssnErrorCode: null,
        ssnErrorText: null,

        birthDate: null,
        birthDateHasError: false,
        birthDateErrorText: null,

        genderId: null,
        genderIdHasError: false,
        genderIdErrorText: null,

        maritalStatusId: null,
        maritalStatusIdHasError: false,
        maritalStatusIdErrorText: null,

        /*Community*/
        organizationId: null,
        organizationIdHasError: false,
        organizationIdErrorText: null,

        communityId: null,
        communityIdHasError: false,
        communityIdErrorText: null,

        /*Telecom*/
        cellPhone: null,
        cellPhoneHasError: false,
        cellPhoneErrorText: null,

        phone: null,
        phoneHasError: false,
        phoneErrorText: null,

        hasEmail: true,

        email: null,
        emailHasError: false,
        emailErrorCode: null,
        emailErrorText: null,

        hasNoEmail: false,

        address: Record({
            street: null,
            streetHasError: false,
            streetErrorText: null,

            city: null,
            cityHasError: false,
            cityErrorText: null,

            stateId: null,
            stateIdHasError: false,
            stateIdErrorText: null,

            zip: null,
            zipHasError: false,
            zipErrorText: null,
        })(),

        avatar: null,
        avatarHasError: false,
        avatarErrorText: null,

        avatarName: null,

        /*Insurance*/
        insuranceNetworkId: null,
        insuranceNetworkIdHasError: false,
        insuranceNetworkIdErrorText: null,

        insurancePaymentPlan: null,
        insurancePaymentPlanHasError: false,
        insurancePaymentPlanErrorText: null,

        groupNumber: null,
        groupNumberHasError: false,
        groupNumberErrorText: null,

        memberNumber: null,
        memberNumberHasError: false,
        memberNumberErrorText: null,

        medicareNumber: null,
        medicareNumberHasError: false,
        medicareNumberErrorText: null,

        medicaidNumber: null,
        medicaidNumberHasError: false,
        medicaidNumberErrorText: null,

        /*Ancillary Information*/
        primaryCarePhysician: null,
        primaryCarePhysicianHasError: false,
        primaryCarePhysicianErrorText: null,

        retained: null,
        retainedHasError: false,
        retainedErrorText: null,

        intakeDate: null,
        intakeDateHasError: false,
        intakeDateErrorText: null,

        currentPharmacyName: null,
        currentPharmacyNameHasError: false,
        currentPharmacyNameErrorText: null,

        referralSource: null,
        referralSourceHasError: false,
        referralSourceErrorText: null,

        riskScore: null,
        riskScoreHasError: false,
        riskScoreErrorText: null,

        isDataShareEnabled: null,
    })()
})