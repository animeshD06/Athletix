FROM node:20-alpine
WORKDIR /app

# Copy package configuration
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the Node.js process
CMD ["npm", "start"]
