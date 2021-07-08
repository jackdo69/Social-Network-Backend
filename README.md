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

# clear elasticsearch
./server/scripts/elasticsearch/clear.sh dev

# update mapping (this is not reccommend) we should create new index and migrate data there
# this command will add extra field to the index and type you provided
# in this case, the index and type has the same name (e.g: 1 index - 1 type)
# the extra field is set from the /data/mapping/update.json
./server/scripts/elasticsearch/update.sh dev {index/type}

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
## Linting
# check lint error

yarn lint

# format with lint

yarn format