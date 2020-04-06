import Mysql from 'src/db/mysql/Mysql'
import { LoginBody } from 'src/services/user/UserService'
import Tables from 'src/db/tableNames'
import User from 'src/domain/User'

class UserRepository {

    login(loginBody: LoginBody): Promise<User> {
        return Mysql.client.select()
            .from(Tables.USERS)
            .where(loginBody)
            .first()
    }
}

export default new UserRepository()