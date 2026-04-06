FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Install Playwright browser + system dependencies
RUN npx playwright install --with-deps chromium

COPY . .
RUN npm run build:prerender

FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/server ./server

USER node

EXPOSE 8080

CMD ["node", "server/index.js"]
