import Mysql from 'src/db/mysql/Mysql'
import Tables from 'src/db/tableNames'
import { UserProduct } from 'src/domain/Product'

class UserProductsRepository {

    // TODO: add get all()

    addProduct(userProduct: UserProduct[]): Promise<any> {
        return Mysql.client(Tables.USER_PRODUCTS).insert(userProduct)
    }

}

export default new UserProductsRepository()