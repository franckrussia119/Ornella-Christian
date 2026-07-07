# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source and build the static site
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine

# Remove default nginx static assets and replace with our build output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Use the project's own nginx config (listens on port 3000)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
