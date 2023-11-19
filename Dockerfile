FROM node:16-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Install bcrypt
RUN npm install bcrypt

# Copy app source code
COPY . .

# Exports
EXPOSE 4000

CMD ["npm","start"]
