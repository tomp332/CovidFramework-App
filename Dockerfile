FROM node:16-alpine
WORKDIR /covidframework-app
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install --legacy-peer-deps --force --silent
COPY . .
EXPOSE 443
ENTRYPOINT ["npm","start"]
