#!/bin/bash

ENV=$1

if ["${ENV}" = "DEV"]; then
    echo "clearing elastic for dev..."
    curl -XDELETE localhost:9200/post
    curl -XDELETE localhost:9200/user
else
    curl -XDELETE localhost:9200/post-test
    curl -XDELETE localhost:9200/user-test
fi
