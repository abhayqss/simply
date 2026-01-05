import Token from './token/TokenInitialState'
import Login from './login/LoginInitialState'
import Logout from './logout/LogoutInitialState'
import Session from './session/SessionInitialState'
import Password from './password/PasswordInitialState'

const { Record } = require('immutable')

export default Record({
    token: Token(),
    login: Login(),
    logout: Logout(),
    session: Session(),
    password: Password(),
})