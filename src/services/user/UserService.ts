
import jwt from 'jsonwebtoken'
import UserRepository from 'src/repositories/UserRepository'
import SessionService from '../session/SessionService'
import { UnauthorizedError } from 'src/domain/BusinessError'

export interface LoginBody {
    username: string,
    password: string
}

class UserService {

    async login(loginBody: LoginBody) {
        // TODO: validate LoginBody entity (attributes)
        const user = await UserRepository.login(loginBody)
        if (!user) {
            throw UnauthorizedError({ message: 'Invalid credentials' })
        }
        return SessionService.generateToken(user.id)
    }

}

export default new UserService()