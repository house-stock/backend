import { Router, NextFunction, Request, Response } from 'express';

// Init router and path
const router = Router();

router.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send('pong');
});

// Export the base-router
export default router;
