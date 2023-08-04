# Signal-Docker

## What *is* Signal anyway?

The full Signal-Project consists of two main branches: the user-facing apps and programs, and the messy server backend

### User-facing apps and programs

- These are the android, ios, and desktop applications. They all are basic programs and have a slew (~12) of urls that ping different backend services

### The backend

- The backend consists of the large [Signal-Server](https://github.com/JJTofflemire/Signal-Server), the brains of the backend, and many small, scalable nodes that all listen on subdomains (chat.signal.org, storage.signal.org, etc)

- The nodes handle parts of Signal like registration, sending images, voice and video calls, etc. Packaging these functions into seperate servers allows for easy scalability in AWS, but for a local implementation they can all be dockerized and ran with the main server on the same system

(add some pretty diagrams here if I am motivated)

## Signal-Project Roadmap

**Goal:** Completely replicate and document the function of [Signal](https://signal.org/)

**Progress:**

- The [main server](https://github.com/JJTofflemire/Signal-Server) that manages E2E messaging compiles and runs without errors
  
  - Functionality is undetermined - in order to test messaging between phones, [registration-service](https://github.com/JJTofflemire/registration-service) needs to be set up first

- To find out where the project is going from here, check out [the To Do section in this repo](#to-do), or the `To Do` sections of any specific Signal repo to see what needs to be done in each of those

# Signal-Server

Note: Signal-Server-Docker has not been updated to use an IAM compatible container (so for the moment Signal-Server will have to be run in EC2 on their bare metal, though I will get around to it)

## Compilation

`cd Signal-Server`

Create a `signal-server` Docker image:

```
docker build --no-cache -t signal-server:1.0 .
```

If you need to reinstall, first run `docker rmi -f signal-server:1.0`

Generate the correct cluster volumes with `bash docker-compose-first-run.sh`

If you call the main `docker-compose.yml` instead of `docker-compose-first-run.yml`, the server will fail with an error related to not being able to connect to the redis cluster

You can fix this by listing all volumes and deleting the ones you just generated:

```
docker volume ls

docker volume rm -f <name-1>
docker volume rm -f <name-2>
etc
```

## Configuration

Folllow [/signal-server-configuration.md` from Main](https://github.com/JJTofflemire/Signal-Server/blob/main/docs/signal-server-configuration.md), and make sure to also follow the [Docker configuration](https://github.com/JJTofflemire/Signal-Server/blob/main/docs/signal-server-configuration.md#dockerized-signal-server-documentation)

## Starting the container

Start the server:

```
docker compose up
```

### Starting the container with [`filtered-docker-compose.sh`](filtered-docker-compose.sh)

This script just calls a one-liner `docker-compose up --no-log-prefix` and runs it through some `awk` / `sed` filters

- Currently the long datadog failed html output is the only thing omitted (since it throws 100 lines of code every couple of seconds and provides no useful info)

- Also colors the words `INFO`, `WARN`, and `ERROR` to green, orange, and red respectively to make it easier to read the server's logs

# To Do

## Signal-Server

- Use [this EC2 spoofer tool](https://github.com/lyft/metadataproxy) to make the docker container work