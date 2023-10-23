# BUILD

FROM node:latest AS build

RUN echo "############################ Start Build Image ############################"
RUN apt-get update && apt-get upgrade -y
ENV TZ="America/Sao_Paulo"
ENV NODE_ENV=development
RUN apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN yarn install
RUN yarn run build
RUN yarn run migration:run

# PRODUCTION

FROM node:18-bullseye-slim 

RUN echo "############################ Start Production Image ############################"
ENV TZ="America/Sao_Paulo"
ENV NODE_ENV=production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN yarn install --production
USER 1000
COPY --chown=1000:1000 --from=build /usr/src/app/dist /usr/src/app/dist
EXPOSE 8080
EXPOSE 443
CMD [ "dumb-init", "node", "./dist/src/main" ]
