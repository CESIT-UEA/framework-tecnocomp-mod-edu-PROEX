# Etapa 1: build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: servir arquivos estáticos com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/app /usr/share/nginx/html
# Remove a configuração default do Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
