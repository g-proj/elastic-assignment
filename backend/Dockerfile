# Use Node.js as base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start"]
