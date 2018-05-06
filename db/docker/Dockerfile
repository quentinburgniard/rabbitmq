FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y software-properties-common
RUN apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
RUN add-apt-repository 'deb http://ftp.osuosl.org/pub/mariadb/repo/10.0/ubuntu trusty main'
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y mariadb-galera-server

COPY my.cnf /etc/mysql/my.cnf
COPY init etc/init
CMD ["mysqld", "--init-file=/etc/init"]
