# First part
FROM node:16.2.0 as build
WORKDIR /covidframework-app-local
COPY package.json .
RUN npm install -g npm@latest
RUN npm config set strict-ssl false
RUN npm install --force --silent
COPY . .
RUN npm run-script build

#Main
EXPOSE 443
CMD ["npm start"]
