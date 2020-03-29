import Product, { Item, UserProduct } from 'src/domain/Product'
import UserProductsRepository from 'src/repositories/UserProductsRepository'


export interface AddUserProduct {
    barcode: string,
    items: Item[]
}

class ProductService {

    async add(product: AddUserProduct): Promise<any> {
        // TODO: get the user id from the session
        const items: UserProduct[] = product.items.map(item => ({ userId: '1', barcode: product.barcode, quantity: item.quantity, expiration: item.expiration }))
        await UserProductsRepository.addProduct(items)
    }
}

export default new ProductService()