FROM ruby:3.0.2-alpine3.14

RUN apk add --update --no-cache \
    build-base \
    gmp-dev \
    libcurl \
    bash \
    git \
    curl \
    less \
    tzdata \
    mysql-client \
    mysql-dev

RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

WORKDIR /myapp

COPY Gemfile Gemfile.lock /myapp/
RUN gem update bundler && bundle install -j4

COPY . /myapp

EXPOSE 3333
