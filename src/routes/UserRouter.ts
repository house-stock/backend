import { Request, Response, Router, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import UserService from 'src/services/user/UserService';
import auth from 'src/middlewares/auth';

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

router.use(auth)

// Get profile
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals
    try {
        const userResponse = await UserService.getUser(user)
        return res.status(OK).json(userResponse);
    } catch (error) {
        console.error('Error user getting user info ', error)
        return next(error)
    }
});

export default router;
