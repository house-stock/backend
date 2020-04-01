import Product, { Item, UserProduct, ProductData } from 'src/domain/Product'
import UserProductsRepository from 'src/repositories/UserProductsRepository'
import { QueryBuilder } from 'knex'
import ProductsRepository from 'src/repositories/ProductsRepository'


export interface AddUserProduct {
    barcode: string,
    items: Item[]
}

export interface UserProductReponse {
    product: Product
    item: Item
}
export class UserProductsFilters {
    sort?: string
    // tslint:disable-next-line: variable-name
    expiration_from?: string
    // tslint:disable-next-line: variable-name
    expiration_to?: string

    constructor() {
        this.buildQueries = this.buildQueries.bind(this)
        this.getSortQuery = this.getSortQuery.bind(this)
        this.getExpirationRangeQuery = this.getExpirationRangeQuery.bind(this)
    }

    buildQueries(queryBuilder: QueryBuilder) {
        return this.getExpirationRangeQuery(this.getSortQuery(queryBuilder))
    }

    getSortQuery(queryBuilder: QueryBuilder): QueryBuilder {
        if (this.sort) {
            const [key, value] = this.sort.split('_')
            queryBuilder.orderBy(key, value)
        }
        return queryBuilder
    }

    getExpirationRangeQuery(queryBuilder: QueryBuilder): QueryBuilder {
        if (this.expiration_from) {
            queryBuilder.where('expiration', '>=', this.expiration_from)
        }
        if (this.expiration_to) {
            queryBuilder.where('expiration', '<=', this.expiration_to)
        }
        return queryBuilder
    }

    static fromJson(json: any) {
        const object = new UserProductsFilters()
        // TODO: Validate the value of the json filters
        object.sort = json.sort
        object.expiration_from = json.expiration_from
        object.expiration_to = json.expiration_to
        return object
    }
}

class ProductService {
    async getAll(user: number, filters: any): Promise<UserProductReponse[]> {
        const userProductFilters = UserProductsFilters.fromJson(filters)
        const userProducts = await UserProductsRepository.getByUserId(user, userProductFilters)
        const productsBarcodes: string[] = [...new Set(userProducts.map(userProduct => userProduct.barcode))];
        const products = await ProductsRepository.findByBarcode(productsBarcodes)

        return userProducts.map(userProduct => {
            const productByBarCode: Product = products
                .find(product => product.scanData.data === userProduct.barcode)
                || { productData: { name: '' }, scanData: { data: '' } }

            return {
                product: productByBarCode,
                item: userProduct
            }
        })

    }

    async add(product: AddUserProduct): Promise<any> {
        // TODO: get the user id from the session
        const items: UserProduct[] = product.items.map(item => ({ userId: '1', barcode: product.barcode, quantity: item.quantity, expiration: item.expiration }))
        await UserProductsRepository.addProduct(items)
    }
}

export default new ProductService()