# pull official base image
FROM node:13.12.0-alpine

# install app dependencies
COPY package.json ./

RUN npm install

# add app
COPY . ./

# this what make hot reloading works
# because you are starting your project
# in the same way you running it locally
RUN yarn run build
CMD yarn start