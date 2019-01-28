#!/usr/bin/env sh
set -e

# grap our gateway address
GATEWAY=$(route -n | grep 'UG[ \t]' | awk '{print $2}')
CONFIGFILE=/run/node_modules/@prodigy/logger/transports/datadog.js
#change prodigy logger to send to the right host
sed -i "s/host: 'localhost'/host: '${GATEWAY}'/" ${CONFIGFILE}

#run our normal command
if [ "$#" -ne "0" ]; then
    exec "$@"
else
    exec node ./src/server.js
fi
