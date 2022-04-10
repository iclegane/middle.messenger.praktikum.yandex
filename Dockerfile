FROM ubuntu:20.04

WORKDIR /var/www

COPY package*.json ./

RUN apt update && apt install -y nodejs && apt install -y npm

COPY . .

RUN npm run build

EXPOSE 3000

CMD node server.js

