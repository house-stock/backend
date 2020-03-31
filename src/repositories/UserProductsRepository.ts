import Mysql from 'src/db/mysql/Mysql'
import Tables from 'src/db/tableNames'
import { UserProduct } from 'src/domain/Product'
import { UserProductsFilters } from 'src/services/UserProductService'

class UserProductsRepository {

    getByUserId(userId: number, filters: UserProductsFilters) {
        return Mysql.client.select()
            .from(Tables.USER_PRODUCTS)
            .where({ userId })
            .modify(filters.getSortQuery)
            // TODO : create a run method in to the filter class to run all the filters
    }

    addProduct(userProduct: UserProduct[]): Promise<any> {
        return Mysql.client(Tables.USER_PRODUCTS).insert(userProduct)
    }

}

export default new UserProductsRepository()