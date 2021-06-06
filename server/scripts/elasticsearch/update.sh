#!/bin/bash

BASE=$(pwd)
ENV="$1"
INDEX="$2"
# PATH="$3"

HEADER="Content-Type: application/json"
DB_URL="http://localhost:9200"

if [[ "${ENV}" == "dev" ]]; then
    echo "updating up the index ${INDEX} for dev environment...."
    curl -XPUT "${DB_URL}"/"${INDEX}"/_mapping/"${INDEX}" -H "${HEADER}" -d "@${BASE}/server/data/mapping/update.json"
else
    echo "updating up the index ${INDEX} for test environment...."
    curl -XPUT "${DB_URL}"/"${INDEX}" -H "${HEADER}" -d "@${BASE}/${PATH}"
fi