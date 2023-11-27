FROM node:latest
EXPOSE 3000
WORKDIR /usr/src/app

COPY *.json .
COPY server-real.js .
RUN npm install
CMD [ "node","server-real.js"] 