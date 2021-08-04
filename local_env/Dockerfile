# First part
FROM node:16.2.0 as build
WORKDIR /covidframework-app-local
COPY ../package.json .
RUN npm install -g npm@latest
RUN npm config set strict-ssl false
RUN npm install --force --silent
COPY ../ .
RUN npm run-script build

FROM node:alpine
RUN npm install -g npm@latest
RUN npm install http-server
COPY ../.cert/localhost .cert/localhost
WORKDIR /covidframework-app-local/build

#Main
EXPOSE 443
CMD ["http-server", "-p" ,"443", "--cert", "../.cert/localhost/RootCA.crt", "--key", "../.cert/localhost/RootCA.key"]
