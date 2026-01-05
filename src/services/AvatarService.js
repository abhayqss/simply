import BaseService from './BaseService'

export class AvatarService extends BaseService {
    findById (avatarId) {
        return super.request({
            url: `/avatars/${avatarId}`
        })
    }
}

const service = new AvatarService()
export default service