const PGConnector = require('../connectors/postgres');

function Users() {}

Users.getUser = ({ id, username }, connections) => PGConnector.getUser(id, username, connections);

module.exports = Users;
