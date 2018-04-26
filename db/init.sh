#!/bin/sh
docker run \
  -d \
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=rabbitmq \
  -e MYSQL_USER=guest \
  -e MYSQL_PASSWORD=guest \
  -p 3306:3306 \
  mariadb
