
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';

import logger from '../utils/winstom.util';

export function validateRequest(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({
        errors: errors.array()
    });

}

export const internalServerError = (error: any, message: string = "Internal Server Error") => {
    return (req: Request, res: Response) => {
        logger.error(error);

        res.status(500).json({
            message
        });
    }
}