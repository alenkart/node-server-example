// user.controller

import { Router, Request, Response } from 'express';
import { body, validationResult, param } from 'express-validator/check';

import { User } from '../models';
import logger from '../utils/winstom.util';
import passport from '../utils/passport.util';
import { validateRequest } from '../utils/validator.util';

const router = Router();

router.get('/',
    async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                error
            });
        }
    });

router.get('/:id',
    [
        param('id').not().isEmpty()
    ],
    validateRequest,
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {

        const users = await User.findById(req.params.id);
        res.json(users);
    });

router.put('/:id',
    [param('id').not().isEmpty()],
    validateRequest,
    async (req: Request, res: Response) => {

        try {

            const result = await User.findByIdAndUpdate(req.params.id, {
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

            const result = await User.deleteOne({
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