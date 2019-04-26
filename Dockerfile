# small server
FROM keymetrics/pm2:8-alpine

MAINTAINER v100it Team "it@vision100.org"

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENV TZ Australia/Sydney

WORKDIR /var/www

COPY package*.json ./

# install dependencies
RUN npm install

# Add app files
COPY . ./

# Build next.js files
RUN npm run build

EXPOSE 3000

CMD pm2-runtime start ecosystem.config.js --env production
