import DateProvider from './DateProvider'

export enum USER_PRODUCTS_STATUS {
    IN_STOCK = 'IN_STOCK',
    CONSUMED = 'CONSUMED'
}
export class UserProduct {
    id?: number
    consumedQuantity: number = 0
    barcode!: string
    expiration!: string
    quantity!: number
    userId!: string

    static fromJson(json: any) {
        const object = Object.assign(new UserProduct(), json)
        object.expiration = (object.expiration instanceof Date) ? DateProvider.toApiFormat(object.expiration) : object.expiration
        return object
    }

    clone(): UserProduct {
        return Object.assign(new UserProduct(), { ...this })
    }

    addQuantity(quantity: number): void {
        this.quantity += quantity
    }

    markAsConsumed(quantity: number): void {
        this.consumedQuantity += quantity;
        this.quantity -= quantity
    }
}