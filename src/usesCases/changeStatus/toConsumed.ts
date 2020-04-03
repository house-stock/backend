import ProductService from 'src/services/product/ProductService'
import UserProductService from 'src/services/userProduct/UserProductService'
import { UserProduct } from 'src/domain/UserProduct'

export default async (user: any, body: any) => {
    const products: UserProduct[] = body.products
    try {
        // TODO: check the actual quantity and do the subtract
        await UserProductService.updateQuantity(user, products)
        // TODO: insert in the new table
    } catch (error) {
        console.error('Error updating the quantity', error)
        throw error
    }
}