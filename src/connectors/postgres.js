const ApiError = require('@prodigy/api').Error;

function PGConnector() {
}

PGConnector.getUser = (id, username, connections) => {
    let query = 'SELECT * FROM users '
        .concat('WHERE id = $1');
    const mapping = [id];
    const mockConnections = connections;

    mockConnections.readDb.query = function mockQuery(name, readQuery, readMapping, callback) {
        return callback(null,
            {
                id,
                username: username || 'Randy Marsh',
                modifiedDate: Date.now(),
            }
        );
    };

    if (username) {
        query = query.concat(' OR username = $2');
        mapping.push(username);
    }

    query = query.concat(';');

    return new Promise((resolve, reject) => {
        mockConnections.readDb.query('get_user_data', query, mapping, (error, rows) => {
            if (error) {
                mockConnections.Logger.error('get_user_data', error);
                reject(new ApiError.Generic());
                return;
            }

            resolve(rows);
        });
    });
};

module.exports = PGConnector;
