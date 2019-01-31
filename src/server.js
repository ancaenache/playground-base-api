const Server = require('@prodigy/api');
const Redis = require('@prodigy/cache');
const Config = require('@prodigy/config');
const Logger = require('@prodigy/logger');
// const Pgsql = require('@prodigy/pgsql');
const Request = require('@prodigy/request');

const envConfig = new Config(process.env);
const config = Config.loadConfigs(envConfig, __dirname.concat('/../'));
const request = new Request(config.get('@prodigy/request'));
const logger = new Logger('playground-base-api', config.get('@prodigy/logger'));
const sessionProvider = new Server.SessionProvider(new Redis(config.get('playground-base-api.sessionCache')));

const api = new Server({
    name: 'playground-base-api',
    route_dir: `${__dirname}/routes`,
    request_stats: true,
    app_key: config.get('playground-base-api.key'),
    config,
    envConfig,
    services: {
        logger,
        config,
        // readDb: new Pgsql(config.get('playground-base-api.db.read')),
        // writeDb: new Pgsql(config.get('playground-base-api.db.write')),
        sessionProvider,
        request,
    },
});

api.init((err) => {
    if (err) {
        throw err;
    }
});
