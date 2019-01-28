module.exports = function appConfig(config) {
    return {
        key: config.getString('SERVICE_BASE_API_KEY'),
        db: {
            read: {
                conn_str: {
                    user: config.getString('DB_GAME_USERNAME'),
                    password: config.getString('DB_GAME_PASSWORD'),
                    host: config.getString('DB_GAME_HOST'),
                    port: config.getInt('DB_GAME_PORT'),
                    database: config.getString('DB_GAME_SCHEMA'),
                },
                pool_size: config.getNullableInt('DB_GAME_POOL_SIZE'),
            },
            write: {
                conn_str: {
                    user: config.getString('DB_GAME_USERNAME'),
                    password: config.getString('DB_GAME_PASSWORD'),
                    host: config.getString('DB_GAME_HOST'),
                    port: config.getInt('DB_GAME_PORT'),
                    database: config.getString('DB_GAME_SCHEMA'),
                },
                pool_size: config.getNullableInt('DB_GAME_POOL_SIZE'),
            },
        },
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
