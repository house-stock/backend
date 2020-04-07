import Mysql from 'src/db/mysql/Mysql'
import { LoginBody } from 'src/services/user/UserService'
import Tables from 'src/db/tableNames'
import User from 'src/domain/User'

class UserRepository {

    getUserbyId(id: number): Promise<User> {
        return Mysql.client.select('id', 'username', 'name')
            .from(Tables.USERS)
            .where({ id })
            .first()
    }

    login(loginBody: LoginBody): Promise<User> {
        return Mysql.client.select()
            .from(Tables.USERS)
            .where(loginBody)
            .first()
    }
}

export default new UserRepository()