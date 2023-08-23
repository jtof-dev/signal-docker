# NGINX and Certbot for the Signal-Project

## Configuration

### External Work

To get started, you'll need a (hopefully static) ip address and a domain

- You'll need your [external ip address](https://wtfismyip.com/), though every time your router restarts this ip will change

  - The easiest implementation is [using an elastic ip](https://github.com/JJTofflemire/Signal-Server/blob/main/docs/signal-server-configuration.md#aws-ec2) with your EC2 instance and running the server there (which is what this guide will assume)

- For a domain, any provider works fine, but `Route 53` is probably the easiest since it's already integrated into AWS (I already had a domain with [njal.la](https://njal.la))

  - Go `Route 53` > `Hosted zones` > your domain > `Create record` > select `A` as the type and enter your subdomain (chat.website.com is the standard prefix used in Signal-Server) and your ip address (or elastic ip)

### In this repo

If this repo or this folder gets stale, [you might want to check](https://github.com/JonasAlfredsson/docker-nginx-certbot/blob/master/docs/dockerhub_tags.md) and see if there is a much newer stable version of nginx-certbot's docker image

Add your email to the [nginx-certbot.env](nginx-certbot.env) file:

```
CERTBOT_EMAIL=sample@email.com
```

Edit the [personal.conf](user_conf.d/personal.conf) into `user_conf.d` and add your domain and ip:

```
server_name example.1.com example.2.com;
proxy_pass http://your-ip:your-port;
```

And change the `test-name` if you want a different name for the folder holding your keys:

```
ssl_certificate         /etc/letsencrypt/live/test-name/fullchain.pem;
ssl_certificate_key     /etc/letsencrypt/live/test-name/privkey.pem;
ssl_trusted_certificate /etc/letsencrypt/live/test-name/chain.pem;
```

And make sure you open all the relavent ports using port forwarding or `Security groups` in EC2, as well as in `docker-compose.yml`

- The default values in this nginx container / Signal-Server and registration-service:

  - Signal-Server hosts on `localhost:8080` and nginx listens on `443`
  
  - registration-service hosts on `localhost:50051` and nginx listens on `442` (to prevent conflicts with Signal-Server)

Signal also requires your to host your own `hcaptcha` landing page

- There is an added `location` block inside `user_conf.d/personal.conf` that redirects `chat.your.domain/signalcaptchas` from the normal Signal-Server on port 443 to `signalcaptchas/index.html`

  - The only configuration you need to do is add your sitekey you got from `hcaptcha` - if you haven't done this already, check out [this section](https://github.com/JJTofflemire/Signal-Server/blob/main/docs/signal-server-configuration.md#hcaptcha) of Signal-Server's documentation

  - Paste the `sitekey` into line 16 of `index.html`:

```
data-sitekey="your-key"
```

## Running the container

`docker-compose up`

## General Notes

- Since this docker image has the `restart: unless-stopped` parameter, once it is set up for the first time you never need to worry about starting it with Signal-Server / registration-service

- After updating the `personal.conf` or `docker-compose.yml`, run `docker-compose down && docker-compose up -d` to restart and apply the changes

- You can get to your certificates like this:

```
docker exec -it <name-of-container> bash
cd etc/letsencrypt/live/test-name/
cat keys.pem
exit
```

## To Do

- Update `user_conf.d/personal.conf` and replace the deprecated `listen 442 ssl http2;`