import Type from './type/NoteEncounterTypeInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    type: new Type(),
})

export default InitialState