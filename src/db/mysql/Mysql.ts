
import initKnex from 'knex'
import knexStringcase from 'knex-stringcase'

class Mysql {
    public static client: initKnex<any, unknown[]>
    public static connect() {
        Mysql.client = initKnex(knexStringcase({
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: '1234',
                database: 'house_stock'
            }
        }))
    }
}

export default Mysql