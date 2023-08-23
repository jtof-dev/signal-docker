# Registration-Service for the Signal-Project

- For general information about `registration-service`, check out [the documentation in my fork](https://github.com/JJTofflemire/registration-service)
- This docker image currently doesn't work. I have no idea why - the deployment is incredibly simple but the server won't respond to the port it is opened on in the `docker-compose.yml`

## Building

Just build the `Dockerfile`. Nice and easy

```
docker build -t registration-service:1.0 .
```

## Configuration

The only step for setting up the dev environment is giving the registration server your website's certificates - instead of putting the new `signal.pem` into `src/main/resources/org/signal/registration/cli/signal.pem`, you can leave it in the working directory next to your `docker-compose`

- The `docker-compose.yml` inserts your credentials

Start the server with: (or with `-d` if you don't need the logs)

```
sudo docker-compose up
```