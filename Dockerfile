FROM node:16.17-alpine3.15

WORKDIR /app

COPY . .

RUN npm ci 

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "build" ]
