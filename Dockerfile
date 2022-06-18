FROM node:16-alpine AS dependencies-layer

ENV NODE_ENV development
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM dependencies-layer AS build-layer
ENV NODE_ENV production
WORKDIR /app

COPY .gitignore .
COPY .dockerignore .
RUN cat .gitignore >> .dockerignore

COPY . .

RUN npm run build

FROM nginx:1.21-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build-layer /app/.config/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf ./*
COPY --from=build-layer /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
