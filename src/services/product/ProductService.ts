import { Product } from 'src/domain/Product'
import ProductsRepository from 'src/repositories/ProductsRepository'
import GetAllFilters from './filters/GetAllFilters'


class ProductService {

    async getAll(filters: GetAllFilters) {
        return ProductsRepository.getAll(GetAllFilters.fromJson(filters))
    }

    async add(product: Product): Promise<any> {
        const productByBarCode = await ProductsRepository.getByBarcode(product.scanData.data)
        if (!productByBarCode) {
            await ProductsRepository.add(product)
        }
    }
}

export default new ProductService()