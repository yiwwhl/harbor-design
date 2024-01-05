FROM node:21-alpine

WORKDIR /app

COPY ./ /app/


RUN npm install -g npm@10.2.5
RUN npm install --legacy-peer-deps

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

CMD ["npm", "run", "start:prod"]