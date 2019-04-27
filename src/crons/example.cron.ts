// example.cron

import mongoose from 'mongoose';
import logger from '../utils/winstom.util';

(async () => {

    const UserModel = mongoose.model('User');

    const users = await UserModel.find();
    users.forEach(user => logger.info(user));

})();
