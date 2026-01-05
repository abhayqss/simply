const { Record, List } = require('immutable')

const Need = Record({
    //by this field we can find a required Need
    index: 0,
    error: null,
    isValid: true,
    fields: new Record({
        id: null,

        domainId: null,
        domainIdHasError: false,
        domainIdErrorText: '',

        priorityId: null,
        priorityIdHasError: false,
        priorityIdErrorText: '',

        activationOrEducationTask: '',
        activationOrEducationTaskHasError: false,
        activationOrEducationTaskErrorText: '',

        completionDate: '',
        completionDateHasError: false,
        completionDateErrorText: '',

        needOpportunity: '',
        needOpportunityHasError: false,
        needOpportunityErrorText: '',

        targetCompletionDate: '',
        targetCompletionDateHasError: false,
        targetCompletionDateErrorText: '',

        proficiencyGraduationCriteria: '',
        proficiencyGraduationCriteriaHasError: false,
        proficiencyGraduationCriteriaErrorText: '',

        needScore: 0,

        goals: List([])
    })()
})

export default Need
