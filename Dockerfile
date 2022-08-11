FROM node:14-alpine

EXPOSE 4000

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN yarn tsc

CMD [ "npm", "start" ]