# Use Node.js 16 on Alpine Linux as a base image
FROM node:16-alpine

# Install Git
RUN apk --no-cache add git

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@13

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm ci

# Copy the entire application to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]
