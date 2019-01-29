module.exports = function appConfig(config) {
    return {
        key: config.getString('SERVICE_BASE_API_KEY'),
        firstParamUI: config.getString('FIRST_PARAM_UI'),
        assetCache: {
            host: config.getString('ASSET_CACHE_HOST'),
            port: config.getInt('ASSET_CACHE_PORT'),
            pool: {
                min: config.getInt('ASSET_CACHE_POOL_MIN'),
                max: config.getInt('ASSET_CACHE_POOL_MAX'),
            },
        },
        sessionCache: {
            host: config.getString('CACHE_SESSION_WRITE_HOST'),
            port: config.getInt('CACHE_SESSION_PORT'),
            pool: {
                min: config.getInt('CACHE_SESSION_POOL_MIN'),
                max: config.getInt('CACHE_SESSION_POOL_MAX'),
            },
        },
        flags: {
            host: config.getString('CACHE_FLAGS_WRITE_HOST'),
            port: config.getInt('CACHE_FLAGS_PORT'),
            pool: {
                min: config.getInt('CACHE_FLAGS_POOL_MIN'),
                max: config.getInt('CACHE_FLAGS_POOL_MAX'),
                idleTimeout: config.getInt('CACHE_FLAGS_IDLE_TIMEOUT'),
            },
        },
    };
};
