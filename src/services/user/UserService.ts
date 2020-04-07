
import UserRepository from 'src/repositories/UserRepository'
import SessionService from '../session/SessionService'
import { UnauthorizedError } from 'src/domain/BusinessError'
import User from 'src/domain/User'

export class LoginBody {
    username!: string
    password!: string

    validate() {
        if (!this.username || !this.password) {
            throw UnauthorizedError({ message: 'The username or password is not present in request' })
        }
    }

    static fromJson(json: any) {
        return Object.assign(new LoginBody(), json)
    }
}

class UserService {

    getUser(user: User): Promise<User> {
        return UserRepository.getUserbyId(user.id)
    }

    async login(json: LoginBody) {
        // TODO: validate LoginBody entity (attributes)
        const loginBody: LoginBody = LoginBody.fromJson(json)
        loginBody.validate()
        const user = await UserRepository.login(loginBody)
        if (!user) {
            throw UnauthorizedError({ message: 'Invalid credentials' })
        }
        return SessionService.generateToken(user.id)
    }

}

export default new UserService()