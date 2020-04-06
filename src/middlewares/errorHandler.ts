import { NextFunction, Request, Response } from 'express'
import { isBusinessError } from 'src/domain/BusinessError'

export default (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    if (isBusinessError(error)) {
        return res.status(error.status || 400).json(error)
    }
    console.log(error.stack || error.toString())
    return res.status(500).json(error.stack)
}