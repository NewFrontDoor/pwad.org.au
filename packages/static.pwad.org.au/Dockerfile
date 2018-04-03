FROM node:8-alpine

MAINTAINER v100it Team "it@vision100.org"

ARG NODE_ENV

WORKDIR /var/www
ENV TZ Australia/Sydney

RUN npm install pm2 -g

COPY package.json ./

# install dependencies
RUN npm install

# Add app files
COPY . ./

EXPOSE 3000

CMD pm2-runtime start process.config.js
