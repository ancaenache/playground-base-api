const ApiError = require('@prodigy/api').Error;

function MockConnector() {
}

function Board(id, name, enabledFlag, modifiedDate) {
    this.id = id;
    this.name = name;
    this.enabledFlag = enabledFlag;
    this.modifiedDate = modifiedDate;
}

MockConnector.getBoard = (id, name, services) => {
    const successIds = [1, 5, 345];
    const rows = [];
    const { logger, config } = services;
    const enabledFlag = config.get('playground-base-api.firstParamUI') || 'default-on';

    return new Promise((resolve, reject) => {
        if (!successIds.includes(id)) {
            logger.error('get_user_data', `MockError: User not found for id ${id}`);
            reject(new ApiError.Generic());
            return;
        }

        if (successIds.includes(id)) {
            rows.push(new Board(id, name || 'Default', enabledFlag, Date.now()));
        }

        resolve(rows);
    });
};

module.exports = MockConnector;
