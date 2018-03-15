FROM node:latest

# Create working directory
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json for dependencies
COPY package*.json ./

# Install npm packages for production
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Exposing port 3000
EXPOSE 3000

# Start command
CMD [ "npm", "start" ]