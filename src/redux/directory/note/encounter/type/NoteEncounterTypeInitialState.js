import List from './list/NoteEncounterTypeListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
})

export default InitialState