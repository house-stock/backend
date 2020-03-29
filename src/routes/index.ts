import { Router, NextFunction, Request, Response } from 'express';
import ProductsRouter from './Products'
import UserProductsRouter from './UserProductsRouter'

const router = Router();

router.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send('pong');
});

// TODO: add generic error handler
router.use('/products',ProductsRouter)
router.use('/user/products',UserProductsRouter)

// Export the base-router
export default router;
