#!/bin/sh
docker run -d --network rabbitmq --hostname my-rabbit-1 --name my-rabbit-1 -e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' rabbitmq:management
docker run -d --network rabbitmq --hostname my-rabbit-2 --name my-rabbit-2 -e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' rabbitmq:management
node ./receive-readability.js
img-resolver/gradlew build
img-resolver/gradlew run
java -jar ./img-resolver/build/libs/img-resolver-0.0.1.jar
node ./send.js
