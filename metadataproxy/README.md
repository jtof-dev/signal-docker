[from here](https://github.com/lyft/metadataproxy)

A back-burnered project that reroutes AWS traffic through a docker image proxy that runs alongside all your other containers

- Requires host `iptables` configuration / port forwarding to manage the proxying, which ends up being the same amount of inconvenience as just using EC2 (though still possibly cheaper)