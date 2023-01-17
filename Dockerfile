FROM node:lts

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN npm install

USER node

EXPOSE 3333

ENV CHOKIDAR_USEPOLLING=true

ENTRYPOINT ["node","ace","serve","--watch"]
