FROM node:lts-alpine as builder

WORKDIR /backend

COPY package*.json ./

RUN npm install && npm install typescript -g && npm audit fix 

COPY . .

COPY ormconfig.docker.js ./ormconfig.js

COPY .env .

EXPOSE 3333

CMD [ "npm", "start" ]