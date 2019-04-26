//user.controller.ts


import { Router, Request, Response } from 'express';
import { body, validationResult, param } from 'express-validator/check';

import models from '../models';
import logger from '../utils/winstom.util';
import passport from '../utils/passport.util';

const router = Router();

router.get('/',
    async (req, res) => {
        try {
            const users = await models.User.find();
            res.json(users);
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                error
            });
        }
    });

router.get('/:id',
    passport.authenticate('jwt', {
        session: false
    }),
    [param('id').not().isEmpty()],
    async (req: Request, res: Response) => {
        const users = await models.User.findById(req.params.id);
        res.json(users);
    });

router.post('/',
    [
        body('username').not().isEmpty(),
        body('password').not().isEmpty(),
        body('email').isEmail(),
    ],
    async (req: Request, res: Response) => {

        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const userModel = new models.User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });

            const user = await userModel.save();

            res.json(user);

        } catch (error) {
            logger.error(error);
            res.status(500).json({
                error
            });
        }

    });

router.put('/:id',
    [param('id').not().isEmpty()],
    async (req: Request, res: Response) => {

        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const result = await models.User.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                active: req.body.active,
            });

            res.json(result);

        } catch (error) {
            logger.error(error);
            res.status(500).json({
                error
            });
        }

    });

router.delete('/:id',
    [param('id').not().isEmpty()],
    async (req: Request, res: Response) => {

        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array()
                });
            }

            const result = await models.User.deleteOne({
                _id: req.params.id
            });

            res.json(result);

        } catch (error) {
            logger.error(error);
            res.status(500).json({
                errors: [error]
            });
        }

    });

export default router;