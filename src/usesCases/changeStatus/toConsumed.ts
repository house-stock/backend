import { UserProduct } from 'src/domain/UserProduct'
import UserProductsRepository from 'src/repositories/UserProductsRepository'
import { hasSameId } from 'src/utils'

export default async (user: any, body: any) => {
    const products: UserProduct[] = body.products.map((json: any) => UserProduct.fromJson(json))
    const ids: any[] = products.map(product => product.id)

    try {
        const currentProducts: UserProduct[] = (await UserProductsRepository.getByIds(ids)).map(currentProduct => UserProduct.fromJson(currentProduct))
        const newProducts = products.map(product => {
            const currentProduct = currentProducts.find(hasSameId(product))
            if (currentProduct) {
                const currentProductCopy = currentProduct.clone()
                currentProductCopy.markAsConsumed(product.quantity)
                return currentProductCopy
            }
            return product
        })

        // TODO : make a decision on what we should do when the quantity is zero
        await UserProductsRepository.updateConsumedQuantity(user.id, newProducts)
    } catch (error) {
        console.error('Error updating the quantity', error)
        throw error
    }
}