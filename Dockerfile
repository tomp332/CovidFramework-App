# First part
FROM node:16.2.0 as build
WORKDIR /covidframework-app
COPY package.json .
RUN npm install -g npm@latest
RUN npm config set strict-ssl false
RUN npm install --force --silent
COPY . .
RUN npm run-script build

# Second part copy important files
FROM nginx:stable-alpine
# Copy certs from covid-volume made externally
COPY .cert/covidframework.com /usr/share/ca-certificates
COPY --from=build /covidframework-app/build /usr/share/nginx/html

# Nginx confs
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY proxy.conf /etc/nginx/conf.d/proxy.conf

#Main
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
