FROM node:14.15 as build-stage
 
WORKDIR /app
 
COPY . /app

RUN npm install
RUN npm run build
 
FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /app/*

EXPOSE 3002

ENTRYPOINT ["nginx", "-g", "daemon off;"]