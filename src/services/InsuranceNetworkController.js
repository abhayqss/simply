import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION

export class InsuranceNetworkController extends BaseService {
    find ({ name, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: '/insurance-networks',
            params: { name, page: page - 1, size }
        })
    }
}

const service = new InsuranceNetworkController()
export default service