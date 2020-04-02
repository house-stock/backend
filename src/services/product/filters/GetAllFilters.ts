export default class GetAllFilters {
    name?: string

    constructor() {
        this.buildFind = this.buildFind.bind(this)
    }

    buildFind() {
        const findQuery = {}
        if (this.name) {
            return { 'productData.name': { $regex: new RegExp(`${this.name}`), $options: 'i' } }
        }
        return findQuery
    }

    static fromJson(json: any) {
        return Object.assign(new GetAllFilters(), json)
    }
}