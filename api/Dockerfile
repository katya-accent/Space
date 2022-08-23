# node image
FROM node:latest
# change wordkirectory to /api

WORKDIR /api 

# copy all files (maintaining filestructure) from machine to container
COPY . .

# install dependencies 
RUN npm i

# expose api port
EXPOSE 8080

# create entrypoint 
ENTRYPOINT [ "npm", "start" ]
