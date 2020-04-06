import { NextFunction, Response, Request } from 'express';
import SessionService from 'src/services/session/SessionService';
import { UnauthorizedError } from 'src/domain/BusinessError';

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw UnauthorizedError({ message: 'Authorization Header is not present' })
    }
    try {
        const token = authHeader.split(' ')[1];
        const session = SessionService.verifytoken(token)
        res.locals.user = session
        next()
    } catch (error) {
        next(UnauthorizedError({ message: 'Invalid credentials', cause: error }))
    }
}