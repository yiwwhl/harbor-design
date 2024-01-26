FROM node:21-alpine

COPY ./ /app/

WORKDIR /app

RUN npm install -g http-server

CMD ["http-server", "-p", "8080"]