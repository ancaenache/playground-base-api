const MockConnector = require('../connectors/mock');
const { Error: apiError } = require('@prodigy/api');


function Boards() {}

Boards.getBoard = ({ id, name }, services) => MockConnector.getBoard(id, name, services);

Boards.incrementViewCounts = function incrementViewCounts(id, services, callback) {
    services.sessionProvider.increment(id, 'boardViewCounts', 1, (error, newCount) => {
        if (error) {
            services.logger.error('incr_view_counts', error);
            return callback(new apiError.DBError('error incrementing board views count'));
        }
        return callback(null, newCount);
    });
};


Boards.getViewCounts = function getViewCounts(id, services, callback) {
    services.sessionProvider.get(id, 'boardViewCounts', (error, count) => {
        if (error) {
            services.logger.error('get_view_counts', error);
            return callback(new apiError.DBError('error reading board view counts'));
        }
        return callback(null, count);
    });
};

module.exports = Boards;
