# Découverte RabbitMQ

## Installation

Lancer le premier noeud RabbitMQ

```
docker run \
-d \
--name rabbit-1 \
--hostname rabbit-1 \
--add-host rabbit-2:172.17.0.3 \
-p 5672:5672 \
-p 15672:15672 \
-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' \
rabbitmq:management
```

Lancer le second noeud RabbitMQ

```
docker run \
-d \
--name rabbit-2 \
--hostname rabbit-2 \
--add-host rabbit-1:172.17.0.2 \
-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' \
rabbitmq:management
```

Démarrer la base de donnée

```
docker run \
-d \
--name mariadb-1 \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=rabbitmq \
-e MYSQL_USER=guest \
-e MYSQL_PASSWORD=guest \
-p 3306:3306 \
mariadb
```

Lancer PhpMyAdmin pour contrôler l'enregistrement

```
docker run \
-d \
--name phpmyadmin-1 \
-e PMA_HOST=172.17.0.4 \
-p 8080:80 \
phpmyadmin/phpmyadmin
```

Lancer P2

```
node readability/readability.js
```

Lancer P3 : un docker Gradle qui renvoit l'image principale de la page

```
docker run \
-d \
-u root \
--name gradle-1 \
--add-host rabbit-1:172.17.0.2 \
-v "$PWD"/img-resolver:/home/gradle/project \
-w /home/gradle/project \
gradle gradle run
```

Lancer P4

```
node db/db.js
```

Lancer P1 pour envoyer l'adresse aux autres noeuds

```
<<<<<<< HEAD
node send/send.js
=======
node db/db.js
>>>>>>> 86d051bd566c6e779715bc73bf363330783a1dc0
```

## Docker

Noeuds Docker : simplement lancer la commande.
Il faut les lancer dans l'ordre car les noeuds communiquent avec les adresses IP que Docker assigne à chaque conteneur (Docker Compose serait sûrement une solution plus élégante).

## Node

Noeuds Node : installer les dépendances avant de lancer les noeuds.

`npm install`
