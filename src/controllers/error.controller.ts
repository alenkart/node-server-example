import { Express, Request, Response, Router, NextFunction } from 'express';

import logger from '../utils/winstom.util';
import { ServerError, NotFoundError } from '../utils/http.util';

const router = Router();

export default (app: Express) => {

    app.use((req: Request, res: Response, next: NextFunction) => {

        const serverError = new NotFoundError();

        res.status(serverError.status).json(serverError);
    });


    app.use((error: any, req: Request, res: Response, next: NextFunction) => {

        logger.error(error);

        const serverError = new ServerError();

        if (error.code) {
            serverError.code = error.code;
        }

        if (error.status) {
            serverError.status = error.status;
        }

        if (error.message) {
            serverError.message = error.message;
        }

        res.status(serverError.status).json(serverError);
    });

}
