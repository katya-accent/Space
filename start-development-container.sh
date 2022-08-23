docker build -t infinispace_frontend ./client
docker run -p 3000:3000 --mount type=bind,source="$(pwd)"/client/src,target=/client/src infinispace_frontend
