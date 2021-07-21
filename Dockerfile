FROM alpine:3.14 as build
WORKDIR /covidframework-app
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install --force --silent
COPY . .
RUN npm run-script build


# production environment
FROM nginx:stable-alpine
COPY .cert/covidframework.com /usr/share/ca-certificates
COPY --from=build /covidframework-app/build /usr/share/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY proxy.conf /etc/nginx/conf.d/proxy.conf

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
