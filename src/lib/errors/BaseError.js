export default class BaseError extends Error {
    constructor ({code, message, status, body}) {
        super()

        this.code = code
        this.message = message || status
        this.status = status
        this.body = body
    }
}