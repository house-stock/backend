import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import UserProductService from 'src/services/userProduct/UserProductService';
import auth from 'src/middlewares/auth';
import ChangeStatus from 'src/usesCases/changeStatus';

const router = Router();

router.use(auth)

// Get all
router.get('/', async (req: Request, res: Response) => {
    const { user } = res.locals
    const { query } = req
    try {
        const products = await UserProductService.getAll(user.id, query)
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

// Update status
router.put('/', async (req: Request, res: Response) => {
    const { body } = req
    try {
        await ChangeStatus({ id: '1' }, body)
        return res.status(OK).json();
    } catch (error) {
        console.error('Error adding user product ', error)
        return res.status(INTERNAL_SERVER_ERROR).json({});
    }
});

export default router;
