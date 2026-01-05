const { Record } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: true,
    isFetching: false,
    fields: Record({
        typeId: null,
        hasErrors: false,
        dateAssigned: null,
        dateCompleted: null,
        contactId: null,
        comment: null
    })()
})