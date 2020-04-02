type ScanData = {
    data: string
}

export type ProductData = {
    name: string
}
export interface Product {
    scanData: ScanData
    productData: ProductData
}