# Build stage: install dependencies and produce the optimized bundle
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Install dependencies using the lockfile for reproducible builds
COPY package*.json ./
RUN npm ci

# Copy the remaining application source code and build the static assets
COPY . .
RUN npm run build

# Production stage: serve the built assets using Nginx
FROM nginx:alpine AS production

# Copy the compiled frontend from the builder stage into Nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 and rely on Nginx's default configuration to serve the app
EXPOSE 80

# Use the default nginx startup command
CMD ["nginx", "-g", "daemon off;"]
