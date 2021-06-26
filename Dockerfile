# Use starter image
FROM node:12

# Create app directory
WORKDIR /var/www/

# Install app dependencies
COPY package*.json /var/www/
RUN npm install

# Bundle app source
COPY . /var/www/

# Expose port
EXPOSE 4000

# Default command to run
RUN npm run build
CMD npm run start 