import { Router, NextFunction, Request, Response } from 'express';
import ProductsRouter from './Products'
// Init router and path
const router = Router();

router.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send('pong');
});

router.use('/products',ProductsRouter)

// Export the base-router
export default router;
