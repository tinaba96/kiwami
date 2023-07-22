FROM node:16.7.0-alpine3.14

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /myapp

RUN apk add --update --no-cache bash curl

COPY package.json yarn.lock /myapp/

RUN yarn install --frozen-lockfile

COPY / /myapp

EXPOSE 3000
