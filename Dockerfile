FROM node:16
WORKDIR /covidframework-app
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install -g npm@7.13.0
RUN npm install --legacy-peer-deps --force
COPY . .
EXPOSE 443
ENTRYPOINT ["npm","start"]
