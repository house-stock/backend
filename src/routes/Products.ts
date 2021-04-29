import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import ProductsRepository from '../repositories/ProductsRepository'
import { paramMissingError } from '@shared/constants';
import { Product } from 'src/domain/Product';
import Responses from 'src/domain/Responses';
import ProductService from 'src/services/product/ProductService';
import auth from 'src/middlewares/auth';

const router = Router();

router.use(auth)

interface QueryProducts {
    name: string
}
interface BodyProduct {
    price: number
}
interface GetProductsParams extends Request {
    query: QueryProducts
    body: BodyProduct
}

interface ErrorResponse {
    messsage: string
}

router.get('/', async (req: GetProductsParams, res: Response<Product[] | ErrorResponse>) => {
    const { query } = req;
    try {
        const products: Product[] = await ProductService.getAll(query)
        return res.status(OK).json(products);
    } catch (error) {
        console.error('Error getting all the products', error)
        return res.status(INTERNAL_SERVER_ERROR).json({
            messsage: 'could not get products'
        });
    }
});

router.get('/barcode/:barcodeId', async (req: Request, res: Response) => {
    const { barcodeId } = req.params
    try {
        const product: Product | null = await ProductsRepository.getByBarcode(barcodeId)
        if (!product) {
            return res.status(NOT_FOUND)
                .send(Responses.bussinessError({
                    message: `The product with barcode ${barcodeId} is not present`,
                    status: NOT_FOUND,
                    errors: []
                }))
        }
        return res.status(OK).json(product);
    } catch (error) {
        console.error('Error getting the product by barcode', barcodeId, error)
        return res.status(INTERNAL_SERVER_ERROR).json({});
    }
});
interface A extends Params {

}

router.post('/', async (req: Request<{}, {}, Product>, res: Response) => {
    const { body } = req
    try {
        await ProductService.add(body)
        // TODO: fail when the product is in the DB
        return res.status(OK).json();
    } catch (error) {
        console.error('Error addind a product ', error)
        return res.status(INTERNAL_SERVER_ERROR).json({});
    }
});

export default router;
