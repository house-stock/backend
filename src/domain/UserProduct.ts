export class UserProduct {
    id?: number
    consumedQuantity: number = 0
    barcode!: string
    expiration!: string
    quantity!: number
    userId!: string

    static fromJson(json: any) {
        return Object.assign(new UserProduct(), json)
    }

    clone() : UserProduct {
        return Object.assign(new UserProduct(), { ...this })
    }

    markAsConsumed(quantity: number): void {
        this.consumedQuantity += quantity;
        this.quantity -= quantity
    }
}