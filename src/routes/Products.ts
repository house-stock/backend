import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import ProductsRepository from '../repositories/ProductsRepository'
import { paramMissingError } from '@shared/constants';

// Init shared
const router = Router();


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await ProductsRepository.getAll()
        return res.status(OK).json(products);
    } catch (error) {
        console.error('Error getting all the products', error)
        return res.status(INTERNAL_SERVER_ERROR).json({});
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { body } = req
    try {
        await ProductsRepository.add(body)
        return res.status(OK).json();
    } catch (error) {
        console.error('Error addind a product ', error)
        return res.status(INTERNAL_SERVER_ERROR).json({});
    }
});

export default router;
