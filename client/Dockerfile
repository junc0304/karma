FROM node:11.14.0-alpine
# Creates the client directory in the container
RUN mkdir -p /app/client
# Sets the working directory to the client directory
WORKDIR /app/client

# Copies the yarn.lock file to the container
COPY yarn.lock /app/client/
# Copies the package.json to the container
COPY package*.json /app/client/

# Installs the client dependencies
RUN npm install

# Copies the files from the client directory to the container
COPY . /app/client/

# Runs the client
CMD ["npm", "start"]