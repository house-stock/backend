import Product from 'src/domain/Product';
import { Mongo } from 'src/db/mongo/mongo';

class ProductsRepository {

    getAll(): Promise<Product[]> {
        // TODO: do it !
        return Promise.resolve([])
    }

    findByBarcode(barcodes: string[]): Promise<Product[]>{
        return Mongo.productsCollection.find<Product>({ _id : { $in : barcodes } }).toArray()
    }

    getByBarcode(barcodeId: string): Promise<Product | null> {
        return Mongo.productsCollection.findOne({ _id: barcodeId })
    }

    add(newProduct: Product): Promise<any> {
        const mongoProduct = {
            _id: newProduct.scanData.data,
            ...newProduct
        }
        console.log('Go to insert this document', mongoProduct)
        return Mongo.productsCollection.insertOne(mongoProduct)
    }


}

export default new ProductsRepository()