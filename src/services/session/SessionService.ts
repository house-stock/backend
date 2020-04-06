import jwt from 'jsonwebtoken'

const accessTokenSecret = ''
class SessionService {

    generateToken(id: string): string {
        return jwt.sign({ id }, accessTokenSecret);
    }

    verifytoken(token: string) {
        return jwt.verify(token, accessTokenSecret);
    }

    // TODO: setup expiration, and find the way to refresh the token
}

export default new SessionService()