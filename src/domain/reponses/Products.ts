import { Product } from '../Product';

export interface Item {
    quantity: number
    expiration: string
}

export interface UserProductResponse extends Product {
    item: Item
}
