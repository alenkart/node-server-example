// user.controller

import { Router, Request, Response, NextFunction } from 'express';
import { param } from 'express-validator/check';

import { User } from '../models';
import passport from '../configs/passport.config';
import { validateRequest, ServerError } from '../utils/http.util';

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
            next(new ServerError({ message: error.message }));
        }

    });

router.put('/:id',
    [param('id').not().isEmpty()],
    validateRequest,
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const { fullname, active } = req.body;

            const result = await User.findByIdAndUpdate(req.params.id, {
                fullname,
                active,
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