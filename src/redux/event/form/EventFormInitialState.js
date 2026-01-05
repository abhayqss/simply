const { Record } = require('immutable')

export default Record({
    error: null,
    isValid: true,
    isFetching: false,
    fields: Record({
        id: null,

        /*Employee*/
        employee: Record({
            role: '',
            firstName: '',
            lastName: '',
        })(),

        /*Client info*/
        client: Record({
            id: null,

            community: '',
            communityHasError: false,
            communityErrorText: '',

            organization: '',
            organizationHasError: false,
            organizationErrorText: '',

            firstName: '',
            firstNameHasError: false,
            firstNameErrorText: '',

            lastName: '',
            lastNameHasError: false,
            lastNameErrorText: '',

            ssn: '',
            ssnHasError: false,
            ssnErrorText: '',
        })(),

        /*Event Essentials*/
        eventEssentials: Record({
            personSubmittingEvent: '',
            personSubmittingEventHasError: false,
            personSubmittingEventErrorText: null,

            careTeamRoleId: '',
            careTeamRoleIdHasError: false,
            careTeamRoleIdErrorText: '',

            eventDate: '',
            eventDateHasError: false,
            eventDateErrorText: null,

            eventTypeId: [],
            eventTypeIdHasError: false,
            eventTypeIdErrorText: '',

            isEmergencyDepartmentVisit: false,
            isEmergencyDepartmentVisitHasError: false,
            isEmergencyDepartmentVisitErrorText: '',

            isOvernightInpatient: false,
            isOvernightInpatientHasError: false,
            isOvernightInpatientErrorText: '',
        })(),

        /*Event Description*/
        eventDescription: Record({
            location: '',
            locationHasError: false,
            locationErrorText: '',

            situation: '',
            situationHasError: false,
            situationErrorText: '',

            background: '',
            backgroundHasError: false,
            backgroundErrorText: '',

            assessment: '',
            assessmentHasError: false,
            assessmentErrorText: '',

            hasInjury: false,
            hasInjuryHasError: false,
            hasInjuryErrorText: '',

            isFollowUpExpected: false,
            isFollowUpExpectedHasError: false,
            isFollowUpExpectedErrorText: '',

            followUpDetails: '',
            followUpDetailsHasError: false,
            followUpDetailsErrorText: '',
        })(),

        /*Treatment Details*/
        /*The name should be treatment, but for integration , we are using treatmentDetails*/
        treatmentDetails: Record({
            hasTreatingPhysician: false,
            hasTreatingPhysicianHasError: false,
            hasTreatingPhysicianErrorText: '',

            /*The name should be treatingPhysician, but for integration , we are using treatingPhysicianDetails*/
            treatingPhysicianDetails: Record({
                firstName: '',
                firstNameHasError: false,
                firstNameErrorText: '',

                lastName: '',
                lastNameHasError: false,
                lastNameErrorText: '',

                phone: '',
                phoneHasError: false,
                phoneErrorText: '',

                hasAddress: false,
                hasAddressHasError: false,
                hasAddressErrorText: '',

                address: Record({
                    street: '',
                    streetHasError: false,
                    streetErrorText: '',

                    city: '',
                    cityHasError: false,
                    cityErrorText: '',

                    stateId: null,
                    stateIdHasError: false,
                    stateIdErrorText: '',

                    zip: '',
                    zipHasError: false,
                    zipErrorText: '',
                })(),
            })(),

            hasHospital: false,
            hasHospitalHasError: false,
            hasHospitalErrorText: '',

            /*The name should be treatingHospital, but for integration , we are using treatingHospitalDetails*/
            treatingHospitalDetails: Record({
                name: '',
                nameHasError: false,
                nameErrorText: '',

                phone: '',
                phoneHasError: false,
                phoneErrorText: '',

                hasAddress: false,
                hasAddressHasError: false,
                hasAddressErrorText: '',

                address: Record({
                    street: '',
                    streetHasError: false,
                    streetErrorText: '',

                    city: '',
                    cityHasError: false,
                    cityErrorText: '',

                    stateId: null,
                    stateIdHasError: false,
                    stateIdErrorText: '',

                    zip: '',
                    zipHasError: false,
                    zipErrorText: '',
                })(),
            })(),
        })(),

        /*Responsible Manager*/
        hasResponsibleManager: false,
        hasResponsibleManagerHasError: false,
        hasResponsibleManagerErrorText: '',

        responsibleManager: Record({
            firstName: '',
            firstNameHasError: false,
            firstNameErrorText: '',

            lastName: '',
            lastNameHasError: false,
            lastNameErrorText: '',

            phone: '',
            phoneHasError: false,
            phoneErrorText: '',

            email: '',
            emailHasError: false,
            emailErrorText: '',
        })(),

        /*Registered Nurse*/
        hasRegisteredNurse: false,
        hasRegisteredNurseHasError: false,
        hasRegisteredNurseErrorText: '',

        registeredNurse: Record({
            firstName: '',
            firstNameHasError: false,
            firstNameErrorText: '',

            lastName: '',
            lastNameHasError: false,
            lastNameErrorText: '',

            hasAddress: false,
            hasAddressHasError: false,
            hasAddressErrorText: '',

            address: Record({
                street: '',
                streetHasError: false,
                streetErrorText: '',

                city: '',
                cityHasError: false,
                cityErrorText: '',

                stateId: null,
                stateIdHasError: false,
                stateIdErrorText: '',

                zip: '',
                zipHasError: false,
                zipErrorText: '',
            })(),
        })()
    })()
})