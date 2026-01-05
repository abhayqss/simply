import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class CareTeamMemberService extends BaseService {
    find ({ clientId, name, page = FIRST_PAGE, size = 10, communityId }) {
        return super.request({
/*            url: `/care-team-members`,*/
            url: '/care-team-members',
            params: { name, page: page - 1, size, clientId, communityId }
        })
    }

    findById (memberId, params) {
        return super.request({
            url: `/care-team-members/${memberId}`,
            params: params,
            mockParams: { id: memberId },
        })
    }

    findCareTeamNotificationPreferences (params) {
        return super.request({
            url: '/care-team-members/notification-preferences',
            params: params
        })
    }

    count (clientId) {
        return super.request({
            url: '/care-team-members/count',
            mockParams: { id: clientId },
        })
    }

    save (member) {
        return super.request({
            method: !isEmpty(member.id) ? 'PUT' : 'POST',
            url: '/care-team-members',
            body: member,
            type: 'json'
        })
    }
}

const service = new CareTeamMemberService()
export default service