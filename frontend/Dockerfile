# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# copy package metadata first for better caching
COPY package*.json ./
RUN npm install

# copy configuration and source
COPY tailwind.config.js postcss.config.js tsconfig.json index.html ./
COPY src ./src

RUN npm run build

# Serve stage
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
