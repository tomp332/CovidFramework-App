FROM node:16.2.0
WORKDIR /covidframework-app
COPY package.json .
RUN npm config set strict-ssl false
RUN npm config update-notifier false
RUN npm install --legacy-peer-deps --force --silent
COPY . .
RUN npm run build
EXPOSE 443
ENTRYPOINT ["npm","start"]
