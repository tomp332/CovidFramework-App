FROM node:16.2.0
WORKDIR /covidframework-app
COPY package.json .
RUN npm config set strict-ssl false
RUN npm install --legacy-peer-deps --force --silent
COPY . .
RUN npm run-script build
RUN cd build
RUN npm install -g serve
EXPOSE 443
ENTRYPOINT ["serve","-s","build"]
