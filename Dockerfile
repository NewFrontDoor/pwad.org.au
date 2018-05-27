FROM node:8.9 as builder

MAINTAINER v100it Team "it@vision100.org"

ARG NODE_ENV

WORKDIR /var/www

COPY package.json ./

# install dependencies
RUN npm install

# Add app files
COPY . ./

# small server
FROM node:8.9-alpine

ENV TZ Australia/Sydney

WORKDIR /var/www

# copy built files
COPY --from=builder /var/www .

# Build next.js files
RUN npm run build

EXPOSE 3000

CMD npm start
