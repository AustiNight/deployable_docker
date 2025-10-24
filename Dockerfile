# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=development

COPY package.json package-lock.json* .npmrc* ./
RUN npm install

COPY . .

EXPOSE 5175
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5175"]

FROM base AS build
ENV NODE_ENV=production
RUN npm run build

FROM node:22-alpine AS preview
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 4175
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4175"]
