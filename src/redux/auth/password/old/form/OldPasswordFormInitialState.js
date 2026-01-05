const {Record} = require('immutable')

export default Record({
    error: null,
    isValid: false,
    isFetching: false,
    fields: Record({
        username: '',

        companyId: '',

        password: '',
        passwordHasError: false,
        passwordErrorText: '',

        newPassword: '',
        newPasswordHasError: false,
        newPasswordErrorText: '',

        confirmNewPassword: '',
        confirmNewPasswordHasError: false,
        confirmNewPasswordErrorText: ''
    })()
})