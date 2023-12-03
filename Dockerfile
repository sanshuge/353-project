FROM node:latest
EXPOSE 3000
WORKDIR /usr/src/app

COPY *.json .
RUN npm install
CMD [ "node","server.js"] 