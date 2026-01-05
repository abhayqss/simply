const { Record } = require('immutable')

const Goal = Record({
    //by index and needIndex we can find a required Goal
    index: 0,
    needIndex: 0,
    error: null,
    isValid: true,
    fields: new Record({
        id: null,

        goal: '',
        goalHasError: false,
        goalErrorText: '',

        barriers: '',
        barriersHasError: false,
        barriersErrorText: '',

        interventionAction: '',
        interventionActionHasError: false,
        interventionActionErrorText: '',

        resourceName: '',
        resourceNameHasError: false,
        resourceNameErrorText: '',

        targetCompletionDate: '',
        targetCompletionDateHasError: false,
        targetCompletionDateErrorText: '',

        completionDate: '',
        completionDateHasError: false,
        completionDateErrorText: '',

        goalCompletion: '',
        goalCompletionHasError: false,
        goalCompletionErrorText: '',
    })()
})

export default Goal
