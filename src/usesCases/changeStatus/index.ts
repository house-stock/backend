import toConsumed from './toConsumed'

const STATUSES = {
    CONSUMED: 'CONSUMED'
}

const map = {
    [STATUSES.CONSUMED]: toConsumed
}
export default async (user: any, body: any) => {
    const mappedFunction = map[body.status]
    if (mappedFunction) {
        return mappedFunction(user, body)
    }
    throw new Error('Invalid Type given')
}