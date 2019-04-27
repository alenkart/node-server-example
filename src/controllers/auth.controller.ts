// auth.controller

import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check';
import { User } from '../models';

const router = Router();

router.post('/',
    [
        body('email').not().isEmpty(),
        body('password').not().isEmpty(),
    ],
    async (req: Request, res: Response) => {

        try {
            
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

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
            console.log(error);
            res.status(500).json({
                error
            });

        }

    });

export default router;

