//user.controller.js
'use strict';

module.exports = ({ router }) => {

    router.get('/', (req, res) => {
        res.send('user');
    });
    
    return router;
}