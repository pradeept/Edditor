# Dockerfile for Node.js Express server
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the server code
COPY . .

# Expose the server port (default: 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
