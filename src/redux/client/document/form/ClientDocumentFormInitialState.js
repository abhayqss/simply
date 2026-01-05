const { Record } = require('immutable')

export default Record({
    error: null,
    isValid: true,
    isFetching: false,
    fields: new Record({
        document: null,
        documentHasError: false,
        documentErrorText: '',

        sharingOption: '',
        sharingOptionHasError: false,
        sharingOptionErrorText: '',
    })()
})