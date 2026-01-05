import Can from './can/CanReportInitialState'
import List from './list/ReportListInitialState'
import Document from './document/ReportDocumentInitialState'

const { Record } = require('immutable')

export default Record({
    can: Can(),
    list: List(),
    document: Document()
})