FROM node:16.0.2-alpine
WORKDIR /covidframework-app
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install --legacy-peer-deps --force --silent
COPY . .
RUN npm run build
EXPOSE 443
ENTRYPOINT ["npm","start"]
