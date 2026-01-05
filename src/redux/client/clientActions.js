import * as clientDocumentCountActions from './document/count/clientDocumentCountActions'
import * as servicePlanCountActions from './servicePlan/count/servicePlanCountActions'
import * as assessmentCountActions from './assessment/count/assessmentCountActions'
import * as eventNoteComposedCountActions from '../event/note/composed/count/eventNoteComposedCountActions'

const countActions = [
//    clientDocumentCountActions, -- uncomment when ready
    servicePlanCountActions,
    assessmentCountActions,
//    eventNoteComposedCountActions -- uncomment when ready
]

export function loadCounts(receiverId) {
    return dispatch => {
        countActions.forEach(action => dispatch(action.load(receiverId)))
    }
}