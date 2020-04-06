import { UNAUTHORIZED } from 'http-status-codes';

const HOUSE_STOCK_ERROR = 'HOUSE_STOCK_ERROR'
class BusinessError {
    cause?: any
    code?: string = ''
    message!: string
    status?: number

}

export const createError = (error: BusinessError) => ({ ...error, type: HOUSE_STOCK_ERROR })

export const UnauthorizedError = (error: BusinessError) => createError({ ...error, status: UNAUTHORIZED })

export const isBusinessError = (error: any) => error && error.type === HOUSE_STOCK_ERROR