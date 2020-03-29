import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import UserProductService from 'src/services/UserProductService';

const router = Router();

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
