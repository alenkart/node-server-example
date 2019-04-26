//auth.controller.js
'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = ({
    validator,
}) => {

    router.post('/',
        [
            validator.body('email').not().isEmpty(),
            validator.body('password').not().isEmpty(),
        ],
        async (req, res) => {

            try {

                const errors = validator.validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        errors: errors.array()
                    });
                }

                const {
                    email,
                    password
                } = req.body;

                const user = await models.User.findOne({
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

    return router;
}