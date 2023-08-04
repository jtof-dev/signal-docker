FROM nginx:latest

# Install Certbot
RUN apt-get update && apt-get install -y certbot cron

RUN echo "0 12 * * * certbot renew --quiet" > /etc/crontab

# Start NGINX and cron
CMD cron && nginx -g 'daemon off;'
