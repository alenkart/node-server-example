//user.controller.js
'use strict';

const router = require('express').Router();
const models = require('../models');

module.exports = ({
    validator,
    passport
}) => {

    router.get('/',
        async (req, res) => {
            const users = await models.User.find();
            res.json(users);
        });

    router.get('/:id',
        passport.authenticate('jwt', {
            session: false
        }),
        [validator.param('id').not().isEmpty()],
        async (req, res) => {
            const users = await models.User.findById(req.params.id);
            res.json(users);
        });

    router.post('/',
        [
            validator.body('username').not().isEmpty(),
            validator.body('password').not().isEmpty(),
            validator.body('email').isEmail(),
        ],
        async (req, res) => {

            try {

                const errors = validator.validationResult(req);

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
                res.status(500).json({
                    error
                });
            }

        });

    router.put('/:id',
        [validator.param('id').not().isEmpty()],
        async (req, res) => {

            try {

                const errors = validator.validationResult(req);

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
                res.status(500).json({
                    error
                });
            }

        });

    router.delete('/:id',
        [validator.param('id').not().isEmpty()],
        async (req, res) => {

            try {

                const errors = validator.validationResult(req);

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
                res.status(500).json({
                    errors: [error]
                });
            }

        });

    return router;
}