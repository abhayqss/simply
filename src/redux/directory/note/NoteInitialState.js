import Type from './type/NoteTypeInitialState'
import Encounter from './encounter/NoteEncounterInitialState'
import Admittance from './admittance/NoteAdmittanceInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    type: new Type(),
    encounter: new Encounter(),
    admittance: new Admittance(),
})

export default InitialState