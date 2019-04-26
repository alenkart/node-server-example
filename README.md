## General

Tested working node.js version 10.15.3 LTS and node 12.0.0 Current. 

## Requirements

* [mongodb](https://www.mongodb.com)
* [pm2](https://yarnpkg.com)

## Environment variables

Please create a .env file with the following content:

```
#This file should never be committed.

#SYSTEM
NODE_ENV=development
PORT=4040
AUTH_SALT_ROUND=10

#MONGO DB
MONGO_DB_URL=mongodb://localhost:27017/example

#AUTH
JWT_SECRET=example_secret_key
JWT_ISSUER=api.example.com
JWT_AUDIENCE=example.com
```