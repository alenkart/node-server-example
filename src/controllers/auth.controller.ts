// auth.controller

import * as jwt from 'jsonwebtoken';
import { body } from 'express-validator/check';
import { Router, Request, Response } from 'express';

import { User } from '../models';
import logger from '../utils/winstom.util';
import { validateRequest, internalServerError } from '../utils/http.util';

const router = Router();

router.post('/signIn',
    [
        body('email').not().isEmpty(),
        body('password').not().isEmpty(),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        try {

            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({
                email
            });

            if (!user) {
                res.status(404).json({
                    error: 'User not found'
                });
                return;
            }

            const same = await user.comparePassword(password);

            if (!same) {
                res.status(500).json({
                    error: 'Unauthorized'
                });
                return;
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
            internalServerError(error);
        }

    });

router.post('/signUp',
    [
        body('username').not().isEmpty(),
        body('password').not().isEmpty(),
        body('email').isEmail(),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        try {

            const userModel = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });

            const user = await userModel.save();

            res.json(user);

        } catch (error) {
            internalServerError(error);
        }

    });

export default router;

