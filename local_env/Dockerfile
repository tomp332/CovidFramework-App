# First stage
FROM node:16.2.0 as build
WORKDIR /covidframework-app-local
COPY ../package.json .
RUN npm install -g npm@latest
RUN npm config set strict-ssl false
RUN npm install --force --silent
COPY ../. .
RUN npm run-script build

#Second stage create nginx
FROM nginx:alpine
COPY --from=build /covidframework-app-local/build /usr/share/nginx/html
# Copy certificates
COPY ../.cert/localhost /usr/share/nginx/
# Copy env file
COPY ../.env /usr/share/nginx/html


# Nginx confs
COPY ./local_env/nginx_local.conf /etc/nginx/conf.d/default.conf
COPY ./local_env/proxy_local.conf /etc/nginx/conf.d/proxy.conf

#Main
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

