import DateProvider from 'src/domain/DateProvider'

interface ObjectWithId {
    id?: number
}
export const hasSameId = (objectA: ObjectWithId) => (objectB: ObjectWithId) => objectA.id === objectB.id

interface ObjectWithExpiration {
    expiration: string
}
export const hasSameExpiration = (objectA: ObjectWithExpiration) =>
    (objectB: ObjectWithExpiration) =>  objectA.expiration === objectB.expiration