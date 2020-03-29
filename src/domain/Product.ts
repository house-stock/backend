type ScanData = {
    data: string
}

type ProductData = {
    name: string
}
export default class Product {
    public scanData!: ScanData
    public productData!: ProductData
}

export interface Item {
    quantity: number
    expiration: string
}

export type UserProduct = {
    barcode: string
    expiration: string
    quantity: number
    userId: string
}