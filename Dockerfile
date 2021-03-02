### STAGE 1: Build ###

FROM node:lts-stretch-slim as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod

### STAGE 2: Setup ###

FROM nginx:stable

## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist/angular-docker /usr/share/nginx/html

COPY ["entrypoint.sh", "/entrypoint.sh"]
CMD ["sh", "/entrypoint.sh"]
