// example.cron

import models from '../models';
import logger from '../utils/winstom.util';

(async () => {

    const users = await models.User.find();
    users.forEach(user => logger.info(user));

})();
