// auth.controller

import * as jwt from 'jsonwebtoken';
import { body } from 'express-validator/check';
import { Router, Request, Response, NextFunction } from 'express';

import { User } from '../models';
import { validateRequest, ForbiddenError, BadRequesError, ServerError } from '../utils/http.util';

const router = Router();

router.post('/signin',
    [
        body('email').not().isEmpty(),
        body('password').not().isEmpty(),
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return next(new ForbiddenError({}));
            }

            const same = await user.comparePassword(password);

            if (!same) {
                return next(new ForbiddenError({}));
            }

            const payload = {
                id: user._id,
                username: user.username,
                email: user.email,
                iss: process.env.JWT_ISSUER,
                aud: process.env.JWT_AUDIENCE,
            };

            const token = await jwt.sign(payload, process.env.JWT_SECRET);

            res.json({
                token
            });

        } catch (error) {
            next(new ServerError({ message: error.message }));
        }

    });

router.post('/signup',
    [
        body('fullname').not().isEmpty(),
        body('username').not().isEmpty(),
        body('password').not().isEmpty(),
        body('email').isEmail(),
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const { fullname, username, password, email } = req.body;

            const user = await User.findOne({ username }, { email });

            if (!user) {
                return next(new BadRequesError({}));
            }

            const userModel = new User({ fullname, username, password, email });

            const newUser = await userModel.save();

            res.json(newUser);

        } catch (error) {
            next(new ServerError({ message: error.message }));
        }

    });

export default router;

