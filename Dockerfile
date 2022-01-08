# First stage
FROM node:16.2.0 as build
WORKDIR /covidframework-app
COPY package.json .
RUN npm install -g npm@latest
RUN npm config set strict-ssl false
RUN npm install --force --silent
COPY . .
RUN npm run-script build

# Second stage copy important files
FROM nginx:stable-alpine
# Copy certs from covid-volume made externally
COPY .cert/localhost /usr/share/ca-certificates
COPY --from=build /covidframework-app/build /usr/share/nginx/html

# Nginx confs
COPY /nginx_conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY /nginx_conf/proxy.conf /etc/nginx/conf.d/proxy.conf

## add permissions for nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
USER nginx

#Main
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
