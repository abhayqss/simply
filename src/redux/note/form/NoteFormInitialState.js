const { Record } = require('immutable')

export default Record({
    error: null,
    isValid: true,
    isFetching: false,
    fields: Record({
        id: null,

        eventId: null,

        /*This should be author, but for backend integration, name was changed*/
        personSubmittingNote: '',
        personSubmittingNoteHasError: false,
        personSubmittingNoteErrorText: '',

        lastModifiedDate: '',
        lastModifiedDateHasError: false,
        lastModifiedDateErrorText: '',

        subTypeId: null,
        subTypeIdHasError: false,
        subTypeIdErrorText: '',

        admitDate: null,
        admitDateHasError: false,
        admitDateErrorText: '',

        encounterNoteTypeId: null,
        encounterNoteTypeIdHasError: false,
        encounterNoteTypeIdErrorText: '',

        clinicianCompletingEncounter: '',
        clinicianCompletingEncounterHasError: false,
        clinicianCompletingEncounterErrorText: '',

        encounterDate: null,
        encounterDateHasError: false,
        encounterDateErrorText: null,

        /*This should be encounterFromTime, but for backend integration, name was changed*/
        from: '',
        fromHasError: false,
        fromErrorText: '',

        /*This should be encounterToTime, but for backend integration, name was changed*/
        to: '',
        toHasError: false,
        toErrorText: '',

        totalSpentTime: '',
        totalSpentTimeHasError: false,
        totalSpentTimeErrorText: '',

        range: '',
        rangeHasError: false,
        rangeErrorText: '',

        units: '',
        unitsHasError: false,
        unitsErrorText: '',

        subjective: '',
        subjectiveHasError: false,
        subjectiveErrorText: '',

        objective: '',
        objectiveHasError: false,
        objectiveErrorText: '',

        assessment: '',
        assessmentHasError: false,
        assessmentErrorText: '',

        plan: '',
        planHasError: false,
        planErrorText: '',
    })()
})