const { Record, List } = require('immutable')

export default Record({
    tab: 0,
    error: null,
    isValid: true,
    isFetching: false,
    fields: new Record({
        id: null,

        /* Summary */
        dateCreated: null,
        dateCreatedHasError: false,
        dateCreatedErrorText: '',

        dateCompleted: null,
        dateCompletedHasError: false,
        dateCompletedErrorText: '',

        createdBy: '',
        createdByHasError: false,
        createdByErrorText: '',

        isCompleted: false,
        isCompletedHasError: false,
        isCompletedErrorText: '',

        /* Need / Opportunities */
        needs: List([]),
    })()
})