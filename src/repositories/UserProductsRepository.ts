import Mysql from 'src/db/mysql/Mysql'
import Tables from 'src/db/tableNames'
import { UserProduct } from 'src/domain/UserProduct'
import GetAllUserProductsFilters from 'src/services/userProduct/filters/GetAll'

class UserProductsRepository {

    getByUserId(userId: number, filters: GetAllUserProductsFilters) : Promise<UserProduct[]> {
        return Mysql.client.select()
            .from(Tables.USER_PRODUCTS)
            .where({ userId })
            .modify(filters.buildQueries)
            // TODO : create a run method in to the filter class to run all the filters
    }

    addProduct(userProduct: UserProduct[]): Promise<any> {
        return Mysql.client(Tables.USER_PRODUCTS).insert(userProduct)
    }

}

export default new UserProductsRepository()