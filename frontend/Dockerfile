# Stage 1: Build the React / Vite application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies using lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copy frontend source code and compile production assets
COPY . .
RUN npm run build

# Stage 2: Serve compiled static assets via Nginx
FROM nginx:alpine

# Copy custom reverse proxy and routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build outputs
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
