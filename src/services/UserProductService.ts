import Product, { Item, UserProduct } from 'src/domain/Product'
import UserProductsRepository from 'src/repositories/UserProductsRepository'
import { QueryBuilder } from 'knex'


export interface AddUserProduct {
    barcode: string,
    items: Item[]
}

export class UserProductsFilters {
    public sort?: string

    constructor() {
        this.getSortQuery = this.getSortQuery.bind(this)
    }

    getSortQuery(queryBuilder: QueryBuilder): QueryBuilder {
        if (this.sort) {
            const [key, value] = this.sort.split('_')
            queryBuilder.orderBy(key, value)
        }
        return queryBuilder
    }

    static fromJson(json: any) {
        const object = new UserProductsFilters()
        // TODO: Validate the value of the json filters
        object.sort = json.sort
        return object
    }
}

class ProductService {
    getAll(user: number, filters: any) {
        const userProductFilters = UserProductsFilters.fromJson(filters)
        return UserProductsRepository.getByUserId(user, userProductFilters)
    }

    async add(product: AddUserProduct): Promise<any> {
        // TODO: get the user id from the session
        const items: UserProduct[] = product.items.map(item => ({ userId: '1', barcode: product.barcode, quantity: item.quantity, expiration: item.expiration }))
        await UserProductsRepository.addProduct(items)
    }
}

export default new ProductService()