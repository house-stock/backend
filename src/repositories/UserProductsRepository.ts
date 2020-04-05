import Mysql from 'src/db/mysql/Mysql'
import Tables from 'src/db/tableNames'
import { UserProduct } from 'src/domain/UserProduct'
import GetAllUserProductsFilters from 'src/services/userProduct/filters/GetAll'
import Knex from 'knex';

interface UpdateFields {
    consumed_quantity?: number
    quantity?: number
}
class UserProductsRepository {

    updateConsumedQuantity(userId: number, products: UserProduct[]): Promise<any> {
        return this._updateQuantities(userId, products, (product) => ({
            consumed_quantity: product.consumedQuantity,
            quantity: product.quantity,
        }))
    }

    updateQuantity(userId: number, products: UserProduct[]): Promise<any> {
        return this._updateQuantities(userId, products, (product) => ({
            quantity: product.quantity,
        }))
    }

    _updateQuantities(userId: number, products: UserProduct[], getFieldsToUpdate: (product: UserProduct) => UpdateFields): Promise<any> {
        return Mysql.client.transaction(trx => {
            const queries: Knex.QueryBuilder[] = [];
            products.forEach(product => {
                const query = Mysql.client
                    .from(Tables.USER_PRODUCTS)
                    .where({ userId, id: product.id })
                    .update(getFieldsToUpdate(product))
                    .transacting(trx); // This makes every update be in the same transaction
                queries.push(query);
            });

            return Promise.all(queries) // Once every query is written
                .then(trx.commit) // We try to execute all of them
                .catch(trx.rollback); // And rollback in case any of them goes wrong
        });
    }

    getByUserId(userId: number, filters: GetAllUserProductsFilters): Promise<UserProduct[]> {
        return Mysql.client.select()
            .from(Tables.USER_PRODUCTS)
            .where({ userId })
            .modify(filters.buildQueries)
        // TODO : create a run method in to the filter class to run all the filters
    }

    getByIds(ids: any[]) {
        return Mysql.client
            .select()
            .from(Tables.USER_PRODUCTS)
            .whereIn('id', ids)
    }

    addProduct(userProduct: UserProduct[]): Promise<any> {
        return Mysql.client(Tables.USER_PRODUCTS).insert(userProduct)
    }

}

export default new UserProductsRepository()