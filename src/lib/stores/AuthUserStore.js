import Store from './Store'

const AUTHENTICATED_USER = 'AUTHENTICATED_USER'

export class AuthUserStore extends Store {
  save (user) {
    return super.save(AUTHENTICATED_USER, user)
  }

  get () {
    return super.get(AUTHENTICATED_USER)
  }

  clear () {
    return super.clear(AUTHENTICATED_USER)
  }
}

export default new AuthUserStore()