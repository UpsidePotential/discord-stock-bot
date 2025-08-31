# Use Node.js 18 LTS
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
COPY tsconfig.json ./


# Copy source code
COPY . .

# Install all dependencies (including dev dependencies for building)
RUN npm install


# Build the TypeScript project
RUN npm run build

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash app && \
    chown -R app:app /app
USER app

# Expose port if needed (optional)
# EXPOSE 3000

# Command to run the built JavaScript
CMD ["npm", "start"]