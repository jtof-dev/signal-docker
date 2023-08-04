#!/bin/bash

cd ..

# get only the name of the working directory in lower case to ensure that the correct volumes are deleted
folder=$(basename "$(pwd)" | tr '[:upper:]' '[:lower:]')

sudo docker volume rm -f "$folder"_redis-cluster_data-0
sudo docker volume rm -f "$folder"_redis-cluster_data-1
sudo docker volume rm -f "$folder"_redis-cluster_data-2
sudo docker volume rm -f "$folder"_redis-cluster_data-3
sudo docker volume rm -f "$folder"_redis-cluster_data-4
sudo docker volume rm -f "$folder"_redis-cluster_data-5

# Download an unmodified Bitnami Redis-Cluster docker-comopse.yml file to generate the correct volumes to use with the modified docker-compose.yml
wget -O docker-compose-first-run.yml https://raw.githubusercontent.com/bitnami/containers/fd15f56824528476ca6bd922d3f7ae8673f1cddd/bitnami/redis-cluster/7.0/debian-11/docker-compose.yml

sudo docker-compose -f docker-compose-first-run.yml up -d && sudo docker-compose -f docker-compose-first-run.yml down

rm docker-compose-first-run.yml

cd scripts

# backup in case you want to do this manually:
#
# docker-compose from here: https://github.com/bitnami/containers/blob/fd15f56824528476ca6bd922d3f7ae8673f1cddd/bitnami/redis-cluster/7.0/debian-11/docker-compose.yml
#
# then run this in the same directory as the main docker-compose.yml:
#
# sudo docker-compose -f docker-compose-first-run.yml up -d && sudo docker-compose -f docker-compose-first-run.yml down