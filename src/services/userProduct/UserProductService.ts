import UserProductsRepository from 'src/repositories/UserProductsRepository'
import ProductsRepository from 'src/repositories/ProductsRepository'
import { Item, UserProductResponse } from 'src/domain/reponses/Products'
import { UserProduct } from 'src/domain/UserProduct'
import { Product } from 'src/domain/Product'
import GetAllUserProductsFilters from './filters/GetAll'
import { hasSameExpiration } from 'src/utils'

export interface AddUserProduct {
    barcode: string,
    items: Item[]
}


class ProductService {
    async getAll(user: number, filters: any): Promise<UserProductResponse[]> {
        const userProductFilters = GetAllUserProductsFilters.fromJson(filters)
        const userProducts : UserProduct[] = await this.getByUserId(user, userProductFilters)
        const productsBarcodes: string[] = [...new Set(userProducts.map(userProduct => userProduct.barcode))];
        const products = await ProductsRepository.findByBarcode(productsBarcodes)

        return userProducts.map(userProduct => {
            const { productData, scanData }: Product = products
                .find(product => product.scanData.data === userProduct.barcode)
                || { productData: { name: '' }, scanData: { data: '' } }

            return {
                productData,
                scanData,
                item: userProduct
            }
        })

    }

    getByUserId(userId: number, filters: GetAllUserProductsFilters): Promise<UserProduct[]> {
        return UserProductsRepository.getByUserId(userId, filters)
            .then(jsons => jsons.map(json => UserProduct.fromJson(json)))
    }

    getAllWithoutProductData(user: number, filters: any): Promise<UserProduct[]> {
        const userProductFilters = GetAllUserProductsFilters.fromJson(filters)
        return UserProductsRepository.getByUserId(user, userProductFilters)
    }

    async add(product: AddUserProduct): Promise<any> {
        // TODO: get the user id from the session
        // TODO: Think if is good idea move this logic to a use case, to do that, we need change the UI, to send the correct JSON
        const userProductFilters = GetAllUserProductsFilters.fromJson({ barcode: product.barcode, expirations: product.items.map(item => item.expiration) })
        const currentProducts: UserProduct[] = await this.getByUserId(1, userProductFilters)
        const itemsToAdd: UserProduct[] = []
        const itemsToUpdate: UserProduct[] = []
        const basePropertiesItem = { userId: '1', barcode: product.barcode }
        product.items.forEach((_item) => {
            const item = UserProduct.fromJson(_item)
            const currentProduct = currentProducts.find(hasSameExpiration(item))
            if (currentProduct) {
                currentProduct.addQuantity(item.quantity)
                itemsToUpdate.push(currentProduct)
            } else {
                const newItem: UserProduct = UserProduct.fromJson({ ...basePropertiesItem, ...item })
                itemsToAdd.push(newItem)
            }
        })
        return Promise.all([
            UserProductsRepository.addProduct(itemsToAdd),
            UserProductsRepository.updateQuantity(1, itemsToUpdate)
        ])
    }
}

export default new ProductService()