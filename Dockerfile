FROM node

RUN mkdir -p /home/app
WORKDIR /home/app
COPY src ./ /home/app/

