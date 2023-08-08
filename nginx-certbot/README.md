# NGINX and Certbot for the Signal-Project

## Configuration

### External Work

To get started, you'll need a (hopefully static) ip address and a domain

- You'll need your [external ip address](https://wtfismyip.com/), though every time your router restarts this ip will change

  - The easiest implementation is [using an elastic ip](https://github.com/JJTofflemire/Signal-Server/blob/main/docs/signal-server-configuration.md#aws-ec2) with your EC2 instance and running the server there (which is what this guide will assume)

- For a domain, any provider works fine, but `Route 53` is probably the easiest since it's already integrated into AWS (I already had a domain with [njal.la](https://njal.la))

  - Go `Route 53` > `Hosted zones` > your domain > `Create record` > select `A` as the type and enter your subdomain (chat.website.com is the standard prefix used in Signal-Server) and your ip address

### In this repo

If this repo or this folder gets stale, [you might want to check](https://github.com/JonasAlfredsson/docker-nginx-certbot/blob/master/docs/dockerhub_tags.md) and see if there is a much newer stable version of nginx-certbot's docker image

Rename [sample-nginx-certbot.env](sample-nginx-certbot.env) to `nginx-certbot.env` and add your email for certbot configuration

```
CERTBOT_EMAIL=sample@email.com
```

Move [sample.conf](sample.conf) into `user_conf.d` (nginx will read `*.conf` in that folder), and add your domain and ip:

```
server_name example.1.com example.2.com;
proxy_pass http://your-ip:your-port;
```

## Running the container

`docker-compose up`