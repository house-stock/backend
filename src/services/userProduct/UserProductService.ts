import UserProductsRepository from 'src/repositories/UserProductsRepository'
import ProductsRepository from 'src/repositories/ProductsRepository'
import { Item, UserProductResponse } from 'src/domain/reponses/Products'
import { UserProduct } from 'src/domain/UserProduct'
import { Product } from 'src/domain/Product'
import GetAllUserProductsFilters from './filters/GetAll'

export interface AddUserProduct {
    barcode: string,
    items: Item[]
}


class ProductService {
    updateQuantity(user: any, products: UserProduct[]) {
        return UserProductsRepository.update(user.id, products)
    }
    async getAll(user: number, filters: any): Promise<UserProductResponse[]> {
        const userProductFilters = GetAllUserProductsFilters.fromJson(filters)
        const userProducts = await UserProductsRepository.getByUserId(user, userProductFilters)
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

    getAllWithoutProductData(user: number, filters: any): Promise<UserProduct[]> {
        const userProductFilters = GetAllUserProductsFilters.fromJson(filters)
        return UserProductsRepository.getByUserId(user, userProductFilters)
    }

    async add(product: AddUserProduct): Promise<any> {
        // TODO: get the user id from the session
        // TODO: If the product is already exists, just add the quantity
        const items: UserProduct[] = product.items.map(item => ({ userId: '1', barcode: product.barcode, quantity: item.quantity, expiration: item.expiration }))
        await UserProductsRepository.addProduct(items)
    }
}

export default new ProductService()