# Discovery of RabbitMQ

## Installation

Launch the first RabbitMQ node

docker run \
-d \
--name rabbit-1 \
--hostname rabbit-1 \
--add-host rabbit-2:172.17.0.3 \
-p 5672:5672 \
-p 15672:15672 \
-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' \
rabbitmq:management

Launch the second RabbitMQ node

docker run \
-d \
--name rabbit-2 \
--hostname rabbit-2 \
--add-host rabbit-1:172.17.0.2 \
-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' \
rabbitmq:management

docker run \
-d \
--name mariadb-1 \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=rabbitmq \
-e MYSQL_USER=guest \
-e MYSQL_PASSWORD=guest \
-p 3306:3306 \
mariadb

docker run \
-d \
--name phpmyadmin-1 \
-e PMA_HOST=172.17.0.4 \
-p 8080:80 \
phpmyadmin/phpmyadmin


Launch the Java img-resolver

docker run \
-d \
-u root \
--name gradle-1 \
--add-host rabbit-1:172.17.0.2 \
-v "$PWD"/img-resolver:/home/gradle/project \
-w /home/gradle/project \
gradle gradle run


docker run \
  -d \
  --name mariadb-1 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=rabbitmq \
  -e MYSQL_USER=guest \
  -e MYSQL_PASSWORD=guest \
  -p 3306:3306 \
  mariadb
