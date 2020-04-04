interface ObjectWithId {
    id?: number
}
export const hasSameId = (objectA: ObjectWithId) => (objectB: ObjectWithId) => objectA.id === objectB.id