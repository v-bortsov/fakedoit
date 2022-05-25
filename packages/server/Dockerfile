FROM node:17.4-alpine as pm2graphql
EXPOSE 4000

WORKDIR /app
COPY . .
RUN chmod +x ./scripts/start.sh
RUN yarn install
CMD ["sh", "./scripts/start.sh"]
