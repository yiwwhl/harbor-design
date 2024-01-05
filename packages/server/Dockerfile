FROM node:21-alpine

WORKDIR /app

COPY ./ /app/

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}


RUN npm install -g npm@10.2.5
RUN npm install --legacy-peer-deps
RUN npm run build


CMD ["npm", "run", "start:prod"]