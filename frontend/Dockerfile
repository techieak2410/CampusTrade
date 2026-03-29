# ─────────────────────────────────────────────
# Stage 1: Build React app with Vite
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install all dependencies (including devDeps for build)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build
# Output: /app/dist


# ─────────────────────────────────────────────
# Stage 2: Serve with Nginx (tiny final image)
# ─────────────────────────────────────────────
FROM nginx:alpine AS production

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
