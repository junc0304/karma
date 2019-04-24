# server/Dockerfile-dev

# Install node image in container
FROM node:11.14.0-alpine

# Install nodemon for hot reloading
RUN npm install -g nodemon

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/

RUN npm install

COPY . /app/server/

CMD ["npm", "server.js"]
