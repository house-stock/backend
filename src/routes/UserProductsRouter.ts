import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import UserProductService from 'src/services/UserProductService';
import auth from 'src/middlewares/auth';

const router = Router();

router.use(auth)

// Get all
router.get('/', async (req: Request, res: Response) => {
    const { user } = res.locals
    const { query } = req
    try {
        const products = await UserProductService.getAll(user, query)
        return res.status(OK).json(products);
    } catch (error) {
        console.error('Error getting all the products', error)
        return res.status(INTERNAL_SERVER_ERROR).json({});
    }
});

// Create
router.post('/', async (req: Request, res: Response) => {
    const { body } = req
    try {
        await UserProductService.add(body)
        return res.status(OK).json();
    } catch (error) {
        console.error('Error adding user product ', error)
        return res.status(INTERNAL_SERVER_ERROR).json({});
    }
});

export default router;
