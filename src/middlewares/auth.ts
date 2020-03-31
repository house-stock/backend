import { NextFunction, Response, Request } from 'express';

export default  (req :Request, res: Response, next : NextFunction) => {
    // TODO: get the session and validate the user
    res.locals.user = 1
    next()
}