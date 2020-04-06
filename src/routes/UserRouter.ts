import { Request, Response, Router, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import UserService from 'src/services/user/UserService';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    try {
        const accessToken = await UserService.login(body)
        return res.status(OK).json(accessToken);
    } catch (error) {
        console.error('Error Login user ', error)
        return next(error)
    }
});

export default router;
