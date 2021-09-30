# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /frontend

# install app dependencies
COPY package.json .

RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]