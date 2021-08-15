#!/bin/bash

ENV="$1"

if [[ ${ENV} == "dev" ]]; then
    echo "clearing elastic for dev..."
    curl -XDELETE localhost:9200/post
    curl -XDELETE localhost:9200/user
    curl -XDELETE localhost:9200/message
else
    curl -XDELETE localhost:9200/post-test
    curl -XDELETE localhost:9200/user-test
    curl -XDELETE localhost:9200/message-test
fi
