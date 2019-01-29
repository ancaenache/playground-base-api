const ApiError = require('@prodigy/api').Error;

function MockConnector() {
}

function Board(id, name, enabledFlag, modifiedDate) {
    this.id = id;
    this.name = name;
    this.enabledFlag = enabledFlag;
    this.modifiedDate = modifiedDate;
}

MockConnector.getBoard = (id, name, container) => {
    const successIds = [1, 5, 345];
    const rows = [];
    const logger = container.logger;
    // const enabledFlag = container.config.getString('FIRST_PARAM_U');
    // console.log(enabledFlag);

    return new Promise((resolve, reject) => {
        if (!successIds.includes(id)) {
            logger.error('get_user_data', `MockError: User not found for id ${id}`);
            reject(new ApiError.Generic());
            return;
        }

        if (successIds.includes(id)) {
            rows.push(new Board(id, name || 'Default', 'on', Date.now()));
        }

        resolve(rows);
    });
};

module.exports = MockConnector;
