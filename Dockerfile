FROM node:14.8.0-alpine3.10

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json  ./

RUN npm ci --production 

COPY --chown=node:node . .

EXPOSE 8080

CMD ["node", "index.js"]
