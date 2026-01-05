const {Record} = require('immutable')

export default Record({
    error: null,
    isValid: false,
    isFetching: false,
    fields: Record({
        token: '',

        password: '',
        passwordHasError: false,
        passwordErrorText: '',

        confirmPassword: '',
        confirmPasswordHasError: false,
        confirmPasswordErrorText: ''
    })()
})