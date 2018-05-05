#!/bin/sh
docker run \
-d \
--name rabbit-1 \
--hostname rabbit-1 \
--add-host rabbit-2:172.17.0.3 \
-p 5672:5672 \
-p 15672:15672 \
-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' \
rabbitmq:management

docker run \
-d \
--name rabbit-2 \
--hostname rabbit-2 \
--add-host rabbit-1:172.17.0.2 \
-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' \
rabbitmq:management
