# Registration-Service for the Signal-Project

- For general information about `registration-service`, check out [the documentation in my fork](https://github.com/JJTofflemire/registration-service)

## Building

`registration-service` has a dev environment which reads an `application.yml` that can be configured to tell it to expect `https` requests. Grab the `fullchain.pem` and `privkey.pem` from your `nginx-certbot` docker image and put the files next to the `Dockerfile`

```
docker exec -it <name of nginx-certbot image> bash
cd /etc/letsencrypt/live/<name>/
cat fullchain.pem
cat privkey.pem
```

- They will get passed in at build - I know that this hardcodes the values, but `volumes:` doesn't play nice with individual files

Just build the `Dockerfile`. Nice and easy

```
docker build -t registration-service:1.0 .
```

## Running

```
sudo docker-compose up
```