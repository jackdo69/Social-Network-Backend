#!/bin/bash

BASE=$(pwd)
ENV="$1"

HEADER="Content-Type: application/json"
DB_URL="http://localhost:9200"

if [[ "${ENV}" == "dev" ]]; then
    echo "setting up the indices for dev environment...."
    curl -X PUT "${DB_URL}"/post -H "${HEADER}" -d "@${BASE}/server/data/mapping/initial/post-index.json"
    curl -X PUT "${DB_URL}"/user -H "${HEADER}" -d "@${BASE}/server/data/mapping/initial/user-index.json"
    npx ts-node ${BASE}/server/data/insertFakeUser.ts
else
    echo "setting up the indices for test environment...."
    curl -X PUT "${DB_URL}"/post-test -H "${HEADER}" -d "@${BASE}/server/data/mapping/initial/post-index.json"
    curl -X PUT "${DB_URL}"/user-test -H "${HEADER}" -d "@${BASE}/server/data/mapping/initial/user-index.json"
fi
