## Environment variables

Please create a .env file with the following content:

```
#This file should never be committed.

#SYSTEM
PORT=4040

#MONGO DB
MONGO_DB_URL=mongodb://localhost:27017/example

#PASSPORT
PASSPORT_JWT_SECRET=example_secret_key
PASSPORT_JWT_ISSUER=api.example.com
PASSPORT_JWT_AUDIENCE=example.com
```