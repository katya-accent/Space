#!/bin/bash

echo "Create schema"
curl -X POST --data "{}" https://infinispace.infinityworks.academy/api/bootstrap | jq
echo "...done"
echo ""
