# Social Network Backend
    Simple backend running for social-network-frontend project


## Prerequisites

- `node` and `npm` (e.g. using `nvm`)
- `docker` and `docker-compose`

## Setup

```sh
# install require package
npm i

# start the redis and elasticsearch
docker-compose up -d

# set up elasticsearch
./server/scripts/elasticsearch/setup.sh DEV

# start the serve
npm start


```

## Checking the Redis store
```sh
    docker exec -it redis redis-cli

    scan 0

 ```