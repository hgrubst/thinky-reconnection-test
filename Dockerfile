FROM node:10.12-alpine

COPY . /application

WORKDIR /application

USER node 
CMD node server