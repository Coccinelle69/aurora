# Use Node 22 LTS (the version Next.js 16 needs)
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY aurora-front/package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY aurora-front/ .

# Expose the Next.js dev port
EXPOSE 3000

# Run Next.js in development mode
CMD ["npm", "run", "dev"]
