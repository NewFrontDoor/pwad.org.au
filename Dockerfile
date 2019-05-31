# small server
FROM node:8.16.0-alpine

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

CMD node ./app.js
