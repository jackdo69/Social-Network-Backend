#!/bin/bash


BASE=$(pwd)

echo "clearing elastic ..."
curl -XDELETE localhost:9200/_all

echo "setting up the indices...."
curl -X PUT http://localhost:9200/post -H 'Content-Type: application/json' -d "@${BASE}/server/data/mapping/post-index.json"
curl -X PUT http://localhost:9200/user -H 'Content-Type: application/json' -d "@${BASE}/server/data/mapping/user-index.json"