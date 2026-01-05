import BaseService from './BaseService'

import {
    ALLOWED_FILE_FORMATS,
    ALLOWED_FILE_FORMAT_MIME_TYPES
} from 'lib/Constants'

const { XLSX } = ALLOWED_FILE_FORMATS

export class ReportService extends BaseService {
    download ({ reportType, ...params }) {
        return super.request({
            url: `/reports/${reportType}`,
            type: ALLOWED_FILE_FORMAT_MIME_TYPES[XLSX],
            params
        })
    }

    canView () {
        return super.request({
            url: '/reports/can-view'
        })
    }
}

export default new ReportService()

