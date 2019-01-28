FROM mhart/alpine-node:8.9

RUN apk add --no-cache make gcc g++ python

WORKDIR /run
ADD . .
RUN npm install
RUN chmod +x ./node_modules/@prodigy/config/entrypoint

EXPOSE 3000
ENTRYPOINT ["./node_modules/.bin/config"]