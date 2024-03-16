# Signal-Docker

## What *is* Signal anyway?

The full Signal-Project consists of two main branches: the user-facing apps and programs, and the messy server backend

### User-facing apps and programs

- These are the android, ios, and desktop applications. They all are basic programs and have a slew (~12) of urls that ping different backend services

### The backend

- The backend consists of the large [Signal-Server](https://github.com/jtof-dev/Signal-Server), the brains of the backend, and many small, scalable nodes that all listen on subdomains (chat.signal.org, storage.signal.org, etc)

- The nodes handle parts of Signal like registration, sending images, voice and video calls, etc. Packaging these functions into seperate servers allows for easy scalability in AWS, but for a local implementation they can all be dockerized and ran with the main server on the same system

```
                             Messaging Dependencies & Implementation
                            ─────────────────────────────────────────

┌────────────────────┐        ┌───────────────────────────────────┐       ┌─────────────────┐
│                    │        │                                   │       │                 │
│ Signal-Server      │◄──────►│ nginx                             │◄─────►│ Signal-Android  │
│ implemented in EC2 │        │ implemented in a docker container │       │ or iOS          │
│                    │        │                                   │       └─────────────────┘
└────────────────────┘        └───────────────────────────────────┘
                                ▲     ▲                    ▲    ▲
                                │     │                    │    │
                                │     │                    │    │
                                │     │                    │    │
                      ┌─────────┘     │                    │    └─────────┐
                      │               │                    │              │
                      ▼               ▼                    ▼              ▼
 ┌──────────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌───────────────────────┐
 │                      │ │                 │ │                 │ │                       │
 │ registration-service │ │ storage-service │ │ backup-service  │ │ SecureValueRecoveryV2 │
 │ implemented in EC2   │ │ not implemented │ │ not implemented │ │ not implemented       │
 │                      │ │                 │ │                 │ │                       │
 └──────────────────────┘ └─────────────────┘ └─────────────────┘ └───────────────────────┘
```

## Signal-Project Roadmap

**Goal:** Completely replicate and document the function of [Signal](https://signal.org/)

**Progress:**

- The [main server](https://github.com/jtof-dev/Signal-Server) that manages E2EE messaging compiles and runs without errors
  
  - Untested, but fully functional
  
  - The server itself works, receiving and sending api requests and registering phone numbers
  
  - Can't test messaging because other unconfigured services are required for messaging to work
  
  - `zkparams` couldn't be generated properly and was cut out, but is probably required in other self-hosted dependencies
  
- [registration-service](https://github.com/jtof-dev/registration-service) is fully functional and you can register numbers over `https` using Signal-Android

  - Relies on the dev environment, which is probably impractical for deployment, but only requied for the actual handshake of registering a phone number (everything is stored in DynamoDB anyway)

- [storage-service](https://github.com/signalapp/storage-service) is a Signal-Server dependency that handles the secure storage of various bits of user information and encrypted messages

  - Not started, but required to finish account creation, finding users to message, and possibly messaging as a whole
  
  - Extremely difficult to deploy - missing any documentation, including any build instructions or `sample.yml`'s to work off of

- [SecureValueRecovery2](https://github.com/signalapp/SecureValueRecovery2) is the place where encrypted account recovery information is stored, locked behind the user's pin

  - Not started, but required to finish account creation
  
  - Relatively easy to deploy - comes with thorough enough build instructions and a `sample.yml` to fill out

## Signal-Project Backend

### Signal-Server

[dockerized](Signal-Server)

- This docker container has not been updated to use an IAM compatible container. This will be a back-burnered project, but you can check out or work on it [in the `metadataproxy` folder](metadataproxy/README.md)

  - This container also probably needs to change how it handles creating the image: as it is currently, it creates a new server with new server-specific certificates. Switching to a two-part build-then-run process would address this, as well as add the ability to pass in your pre-existing signal-server.jar at runtime

[full instructions](https://github.com/jtof-dev/Signal-Server)

- This is the guide to follow to deploy Signal-Server in an EC2 instance

### Registration Service

[dockerized](registration-service)

- The `Dockerfile` and `docker-compose.yml` appear to have the correct implementation, but even after exposing ports and port forwarding the server can't be pinged by public ip address

- Currently not working despite being a very simple program to Dockerize. I am unsure why it doesn't work, but for the moment you will have to run `registration-service` on bare metal

[full instructions](https://github.com/jtof-dev/registration-service)

## Others

### NGNIX with Certbot

[dockerized docs](nginx-certbot)

- [This docker image](https://github.com/JonasAlfredsson/docker-nginx-certbot/tree/master) handles the annoying bits of deploying NGINX and automates getting and renewing `https` certificates

- The image passes in any custom configuration files at runtime, allowing for ease of use in addition to being dead simple to set up

### Redis-Cluster

[dockerized docs](redis-cluster)

- Very simple deployment (one script), with some added notes on manually verifying that everything works as intended

## To Do

- Debug registration-service

  - Currently unresponsive to any pings despite building and running without errors and reading changes in the `application.yml`

- Completely fill out Signal-Android
  - include reminders about gcloud oath2