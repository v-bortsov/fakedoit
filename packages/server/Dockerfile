FROM node:17.4-alpine as pm2graphql
WORKDIR /app
COPY . .
RUN npm i pm2 webpack -g
RUN yarn install
# RUN yarn build
# RUN node ./dist/makeModels.js
# RUN pm2 start ./dist/server.bundle.js
EXPOSE 4000
CMD tail -f /dev/null