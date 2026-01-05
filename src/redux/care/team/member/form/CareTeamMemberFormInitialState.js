const { List, Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: true,
    isFetching: false,
    fields: new Record({
        id: null,

        contactId: '',
        contactIdHasError: false,
        contactIdErrorText: '',

        canChangeEmployee: true,

        roleId: null,
        roleIdHasError: false,
        roleIdErrorText: '',

        canChangeRole: true,

        description: '',
        descriptionHasError: false,
        descriptionErrorText: '',

        isIncludedInFaceSheet: false,
        isIncludedInFaceSheetHasError: false,
        isIncludedInFaceSheetErrorText: '',

        notificationPreferences: [],

    })()
})