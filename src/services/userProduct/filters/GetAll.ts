import { QueryBuilder } from 'knex'

export default class GetAllUserProductsFilters {
    sort?: string
    barcode?: string
    // tslint:disable-next-line: variable-name
    expiration_from?: string
    // tslint:disable-next-line: variable-name
    expiration_to?: string

    constructor() {
        this.buildQueries = this.buildQueries.bind(this)
        this.getSortQuery = this.getSortQuery.bind(this)
        this.getBarcodeQuery = this.getBarcodeQuery.bind(this)
        this.getExpirationRangeQuery = this.getExpirationRangeQuery.bind(this)
    }

    buildQueries(queryBuilder: QueryBuilder) {
        return this.getExpirationRangeQuery(
            this.getBarcodeQuery(
                this.getSortQuery(queryBuilder)
            )
        )
    }

    getSortQuery(queryBuilder: QueryBuilder): QueryBuilder {
        if (this.sort) {
            const [key, value] = this.sort.split('_')
            queryBuilder.orderBy(key, value)
        }
        return queryBuilder
    }

    getBarcodeQuery(queryBuilder: QueryBuilder): QueryBuilder {
        if (this.barcode) {
            queryBuilder.where({ barcode: this.barcode })
        }
        return queryBuilder
    }

    getExpirationRangeQuery(queryBuilder: QueryBuilder): QueryBuilder {
        if (this.expiration_from) {
            queryBuilder.where('expiration', '>=', this.expiration_from)
        }
        if (this.expiration_to) {
            queryBuilder.where('expiration', '<=', this.expiration_to)
        }
        return queryBuilder
    }

    static fromJson(json: any) {
        return Object.assign(new GetAllUserProductsFilters(), json)
    }
}
