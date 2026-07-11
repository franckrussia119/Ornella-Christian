# ---- Build stage: install deps, compile the frontend ----
FROM node:22-bookworm-slim AS build
WORKDIR /app

# python3/build-essential are a safety net for better-sqlite3's native module —
# if a prebuilt binary isn't available for this exact platform, npm falls
# back to compiling from source, which needs these.
RUN apt-get update && apt-get install -y --no-install-recommends python3 build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Runtime stage: only what's needed to run the server ----
FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update && apt-get install -y --no-install-recommends python3 build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY server ./server

# SQLite database file lives here — mount this as a persistent volume in
# Coolify (Storage tab) so data survives redeploys and restarts.
RUN mkdir -p /app/data
VOLUME ["/app/data"]

EXPOSE 3000
CMD ["node", "server/index.js"]
