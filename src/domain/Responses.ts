
interface Error {
    reason: string,
    nextStep: string
}
interface BussinessError {
    message: string,
    status: number,
    errors: Error[]
}
class Responses {

    bussinessError({ message, status, errors = [] }: BussinessError) {
        return {
            status,
            message,
            errors
        }
    }
}

export default new Responses()