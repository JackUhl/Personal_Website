# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY client/ ./client/
COPY server/ ./server/

# Build server and client
RUN npm run build --workspace=server && npm run build --workspace=client

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production dependency installation
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install production dependencies only
RUN npm ci --omit=dev

# Copy build artifacts
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist

EXPOSE 3000

CMD ["node", "server/dist/server.js"]
