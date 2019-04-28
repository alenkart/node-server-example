// user.controller

import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator/check';

import { User } from '../models';
import passport from '../utils/passport.util';
import { validateRequest, BadRequesError, ServerError } from '../utils/http.util';

const router = Router();

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const users = await User.find();
            res.json(users);

        } catch (error) {
            next(new ServerError({ message: error.message }));
        }

    });

router.get('/:id',
    [
        param('id').not().isEmpty()
    ],
    validateRequest,
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const users = await User.findById(req.params.id);
            res.json(users);

        } catch (error) {
            console.log(error.message);
            next(new ServerError({ message: error.message }));
        }

    });

router.put('/:id',
    [param('id').not().isEmpty()],
    validateRequest,
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const result = await User.findByIdAndUpdate(req.params.id, {
                fullname: req.body.fullname,
                active: req.body.active,
            });

            res.json(result);

        } catch (error) {
            next(new ServerError({ message: error.message }));
        }

    });

router.delete('/:id',
    [param('id').not().isEmpty()],
    validateRequest,
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const result = await User.deleteOne({
                _id: req.params.id
            });

            res.json(result);

        } catch (error) {
            next(new ServerError({ message: error.message }));
        }

    });

export default router;