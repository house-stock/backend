class DateProvider {
    toApiFormat(date: Date): string {
        return date.toISOString().split('T')[0]
    }
}


export default new DateProvider()