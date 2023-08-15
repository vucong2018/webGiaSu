'use strict'
const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}
const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}
const { statusCodes, ReasonPhrases } = require('../utils/httpStatusCode')
class ErrorRespone extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorRespone {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorRespone {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorRespone {
    constructor(message = ResonPhrases.UNAUTHORIZED, statusCode = statusCodes.UNAUTHORIZED)
}

module.exports = {
    ConflictRequestError, BadRequestError, AuthFailureError
}