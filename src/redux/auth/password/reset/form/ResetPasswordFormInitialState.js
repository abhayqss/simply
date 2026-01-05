const {Record} = require('immutable')

export default Record({
    error: null,
    isValid: false,
    isFetching: false,
    fields: Record({
        companyId: '',
        companyIdHasError: false,
        companyIdErrorText: '',

        email: '',
        emailHasError: false,
        emailErrorText: '',
    })()
})