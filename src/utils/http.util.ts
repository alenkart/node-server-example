
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';

export function validateRequest(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({
        errors: errors.array()
    });

}

export enum HttpErrorCode {
    internalServerError = 0,
    badRequest = 1,
    notFound = 2,
    userNotFound = 3,
    forbidden = 4,
}

export class ServerError extends Error {
    public code?: number;
    public status?: number;

    constructor({
        message = "Internal Server Error",
        code = HttpErrorCode.internalServerError,
        status = 500
    } = {}) {
        super();
        this.code = code;
        this.status = status;
        this.message = message;
    }
}

export class BadRequesError extends ServerError {
    constructor({
        code = HttpErrorCode.badRequest,
        status = 400,
        message = "Bad Request"
    } = {}) {
        super({ message, code, status });
    }
}

export class NotFoundError extends ServerError {
    constructor({
        code = HttpErrorCode.notFound,
        status = 404,
        message = "Not Found"
    } = {}) {
        super({ message, code, status });
    }
}

export class ForbiddenError extends ServerError {
    constructor({
        code = HttpErrorCode.userNotFound,
        status = 403,
        message = "Forbidden"
    } = {}) {
        super({ message, code, status });
    }
}