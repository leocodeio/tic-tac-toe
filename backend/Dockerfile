
# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /backend_app

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm i -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 3001

# Start the backend application
CMD ["pnpm", "run", "start"]
