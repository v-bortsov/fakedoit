#!/bin/bash
npm i pg --save
npm i pm2 webpack sequelize-auto -g

yarn build
node ./dist/makeModels.js
# sequelize-auto -o "./$MODELS_DIR" -d $POSTGRES_NAME -h $POSTGRES_HOST -u $POSTGRES_USER -p $POSTGRES_PORT -x $POSTGRES_PASS -e postgres -l ts

pm2 start ./dist/server.bundle.js