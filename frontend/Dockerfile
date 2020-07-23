FROM node:lts-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install && npm audit fix

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]