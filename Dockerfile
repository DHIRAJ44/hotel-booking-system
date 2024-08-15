
FROM node:20 AS client-builder

# Set working directory to /app/client
WORKDIR /app/client

# Copy the client package.json and package-lock.json
COPY client/package*.json ./

# Install dependencies for React app
RUN npm install

# Copy the rest of the React app files
COPY client/ ./

# Build the React app
RUN npm start

# Stage 2: Build Node.js Server
FROM node:20 AS server-builder

# Set working directory to /app/server
WORKDIR /app/server

# Copy the server package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies for Node.js server
RUN npm install

# Copy the rest of the Node.js server files
COPY server/ ./

# Copy the React build files from the client-builder stage to the server's public directory
COPY --from=client-builder /app/client/build ./public

# Expose the port the server runs on
EXPOSE 3000

# Command to run the Node.js server
CMD ["npm", "start"]
