# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Install nodemon globally
RUN npm install -g nodemon

# Command to run the app in development mode with nodemon
CMD ["nodemon", "index.js"]
