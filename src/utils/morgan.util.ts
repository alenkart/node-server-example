// morgan.util

import morgan, { Options } from "morgan";
import logger from './winstom.util';

const morganOption: Options = {
    stream: {
        write: (message: string) => {
            logger.info(message.trim());
        },
    },
};

export default morgan('combined', morganOption);

