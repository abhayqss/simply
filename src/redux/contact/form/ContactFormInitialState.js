const { Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: true,
    isFetching: false,
    fields: new Record({
        id: null,

        /*General Data*/
        firstName: '',
        firstNameHasError: false,
        firstNameErrorText: '',

        lastName: '',
        lastNameHasError: false,
        lastNameErrorText: '',

        systemRoleId: null,
        systemRoleIdHasError: false,
        systemRoleIdErrorText: '',

        professionals: null,
        professionalsHasError: false,
        professionalsErrorText: '',

        login: '',
        loginHasError: false,
        loginErrorCode: null,
        loginErrorText: '',

        status: null,

        organizationId: null,
        organizationIdHasError: false,
        organizationIdErrorText: '',

        communityId: null,
        communityIdHasError: false,
        communityIdErrorText: '',

        avatar: null,
        avatarHasError: false,
        avatarErrorText: null,

        avatarName: '',

        /*Contact Info*/
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

        phone: null,
        phoneHasError: false,
        phoneErrorText: '',

        mobilePhone: null,
        mobilePhoneHasError: false,
        mobilePhoneErrorText: '',

        fax: null,
        faxHasError: false,
        faxErrorText: '',

        secureMail: null,
        secureMailHasError: false,
        secureMailErrorText: '',

        /*Settings*/
        /*enabledSearchCapability: false,
        enabledSearchCapabilityHasError: false,
        enabledSearchCapabilityErrorText: '',*/

        enableContact: true,
        enableContactHasError: false,
        enableContactErrorText: '',
    })()
})