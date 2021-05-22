#!/bin/bash

BASE=$(pwd)
ENV="$1"

if [[ "${ENV}" == "dev" ]]; then
    echo "setting up the indices for dev environment...."
    curl -X PUT http://localhost:9200/post -H 'Content-Type: application/json' -d "@${BASE}/server/data/mapping/post-index.json"
    curl -X PUT http://localhost:9200/user -H 'Content-Type: application/json' -d "@${BASE}/server/data/mapping/user-index.json"
else
    echo "setting up the indices for test environment...."
    curl -X PUT http://localhost:9200/post-test -H 'Content-Type: application/json' -d "@${BASE}/server/data/mapping/post-index.json"
    curl -X PUT http://localhost:9200/user-test -H 'Content-Type: application/json' -d "@${BASE}/server/data/mapping/user-index.json"
fi
