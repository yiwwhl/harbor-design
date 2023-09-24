FROM node:16-alpine

RUN mkdir /app

COPY ./packages/playground/dist /app/