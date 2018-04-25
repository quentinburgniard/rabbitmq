FROM node
WORKDIR /data
RUN apt-get update && apt-get -y install \
 git \
 imagemagick \
 libmagick++-dev \
 node-gyp \
 emacs
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
