#!/bin/sh
# arrêter noued rabbit-2
docker exec -ti rabbit-2 bash -c "rabbitmqctl stop_app" && \
# joindre rabbit-2 à rabbit-1
docker exec -ti rabbit-2 bash -c "rabbitmqctl join_cluster rabbit@rabbit-1" && \
# relancer rabbit-2
docker exec -ti rabbit-2 bash -c "rabbitmqctl start_app" && \
# pour toutes les listes d'attentes, synchronisation automatique
docker exec -ti rabbit-1 bash -c "rabbitmqctl set_policy ha \"\" \
  '{\"ha-mode\":\"all\",\"ha-sync-mode\":\"automatic\"}'"
