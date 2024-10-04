# Bitnami's Redis-Cluster for the Signal-Project

- Adapted from [Bitnami's Redis-Cluster `docker-compose.yml`](https://github.com/bitnami/containers/blob/main/bitnami/redis-cluster/docker-compose.yml)

## Deploying

- For some reason, just running `docker-compose up` with this repo's modified `docker-compose.yml` will cause the cluster to fail and need to be redone. So instead:

```
bash docker-compose-first-run.sh
docker-compose up -d
```

### Manually Deploying

Or you can download the file from [here](https://github.com/bitnami/containers/blob/fd15f56824528476ca6bd922d3f7ae8673f1cddd/bitnami/redis-cluster/7.0/debian-11/docker-compose.yml), rename it to `docker-compose-first-run.yml`, place it next to the existing `docker-compose.yml` here and run it with:

```
sudo docker-compose -f docker-compose-first-run.yml up -d && sudo docker-compose -f docker-compose-first-run.yml down
```

If you want to verify that the first run has correctly started a redis cluster:

- Start the container (`sudo docker-compose -f docker-compose-first-run.yml up -d`)

- Find the name of a container to check the logs of with `sudo docker ps`

- Run `sudo docker logs <name from before>` and look for a line like:

```
1:S 06 Jul 2023 22:53:49.430 * Connecting to MASTER 172.27.0.6:6379
```

- Use that IP and port to connect to the server: `redis-cli -h 172.27.0.6 -p 6379`

- Authenticate yourself with `AUTH bitnami`

- Run `CLUSTER INFO`, and if it started correctly, will output:

```
172.27.0.6:6379> CLUSTER INFO
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
etc
```

If you started the modified [docker-compose.yml](docker-compose.yml) before your first run, this test will fail. You can fix it with the `docker-compose-first-run.sh` or manually:

```
docker volume rm signal-server_redis-cluster_data-0
docker volume rm signal-server_redis-cluster_data-1
docker volume rm signal-server_redis-cluster_data-2
docker volume rm signal-server_redis-cluster_data-3
docker volume rm signal-server_redis-cluster_data-4
docker volume rm signal-server_redis-cluster_data-5
```

Which assumes that you are in a folder named `Signal-Server`

Which should erase all volumes created by the dockerized redis-cluster (and erease all data stored on the cluster)

- Then rerun the first manual generation command

- NOTE: there is a copy of redis-cluster's `docker-compose.yml` in both `redis-cluster/` and `Signal-Server/`. As far as I can tell (I don't remember why I did this), this folder is specifically for documentation, and redis cuslter should be ran from `Signal-Server/`
