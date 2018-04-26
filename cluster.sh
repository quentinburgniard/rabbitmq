#!/bin/sh
docker exec -ti rabbit-2 bash -c "rabbitmqctl stop_app" && \
docker exec -ti rabbit-2 bash -c "rabbitmqctl join_cluster rabbit@rabbit-1" && \
docker exec -ti rabbit-2 bash -c "rabbitmqctl start_app" && \
docker exec -ti rabbit-1 bash -c "rabbitmqctl set_policy ha \"\" \
  '{\"ha-mode\":\"all\",\"ha-sync-mode\":\"automatic\"}'"
