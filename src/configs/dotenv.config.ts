// dotenv.config

import { resolve } from 'path';
import { config } from 'dotenv';

const path = resolve(__dirname, "../../.env");

config({ path });
