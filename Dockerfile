FROM node:21-alpine

WORKDIR /app

COPY ./ /app/

RUN npm install -g http-server

CMD ["http-server", "-p", "8080"]