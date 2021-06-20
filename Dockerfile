# Use starter image
FROM ubuntu:latest
RUN apt update && apt install -y nodejs && apt install -y npm && apt install -y netcat

# Create app directory
WORKDIR /var/www/

# Install app dependencies
COPY server-app/ /var/www/
COPY utils/wait-for.sh wait-for.sh
RUN chmod +x wait-for.sh
RUN npm install


# Expose port
EXPOSE 3000

# Default command to run
RUN npm run build