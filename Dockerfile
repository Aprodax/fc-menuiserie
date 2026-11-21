# syntax=docker/dockerfile:1

# --- Étape 1 : installe les dépendances et génère le site (.output) ---
FROM node:24-slim AS build
WORKDIR /app
RUN npm install -g pnpm@11.23.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm build

# --- Étape 2 : image finale, seulement le serveur autonome généré par Nuxt ---
FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
COPY --from=build --chown=node:node /app/.output ./.output
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
