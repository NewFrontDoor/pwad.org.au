FROM node:8.12 as builder

MAINTAINER v100it Team "it@vision100.org"

ARG NODE_ENV

WORKDIR /var/www

COPY package.json package-lock.json ./

# install dependencies
RUN npm install

# Add app files
COPY . ./

# Build next.js files
RUN npm run build

# small server
FROM keymetrics/pm2:8-alpine

ENV TZ Australia/Sydney

WORKDIR /var/www

# copy built files
COPY --from=builder /var/www .

RUN npm prune --production

EXPOSE 3000

CMD pm2-runtime start ecosystem.config.js
