import jwt_decode from 'jwt-decode'
import AuthService from './auth.service'

export default function tokenPayload () {
  const user = AuthService.getCurrentUser()

  if (user && user.token) {
    return jwt_decode(user.token)
  } else {
    return {}
  }
}
