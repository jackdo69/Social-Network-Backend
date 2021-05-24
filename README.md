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
./server/scripts/elasticsearch/setup.sh dev

# start the service
npm start


```

## Checking the Redis store

```sh
# run command for redis in interactive mode
docker exec -it redis redis-cli

scan 0

```

## Testing

```sh
# start the redis and elasticsearch
docker-compose up -d

# start the service in test mode
npm start:test

# run test in another terminal
npm run test
```
