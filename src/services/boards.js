const MockConnector = require('../connectors/mock');

function Boards() {}

Boards.getBoard = ({ id, name }, container) => MockConnector.getBoard(id, name, container);

module.exports = Boards;
