const Boards = require('../services/boards');
const { Error: apiError } = require('@prodigy/api');

/**
 * @api {get} /playground-base-api/board/:id Get board data
 * @apiName getBoard
 * @apiGroup payground-base-api
 * @apiDescription Get data for a given board
 *
 * @apiParam  {Number} boardID Eg. 23423
 * @apiParam  {String}  name Eg. 'Dashboard'
 *
 * @apiSuccess (200) {Number} boardID
 * @apiSuccess (200) {String} name
 * @apiSuccess (200) {DateTime} modifiedDate
 */

exports.getBoard = {
    name: 'getBoard',
    method: 'get',
    endpoint: '/playground-base-api/board/:id',
    desc: 'sample get route for retrieving board data',
    session_auth: false,
    application_auth: false,
    version: 'v1',
    inputs: {
        id: {
            required: true,
            formatter: value => parseInt(value, 10),
            validate: value => value > 0,
        },
        name: {
            required: false,
        },
    },
    run: (services, data, next) => {
        Boards.getBoard(data, services)
            .then((board) => {
                Boards.incrementViewCounts(data.id, services, (incrErr, newCount) => {
                    let response = {};

                    if (incrErr) {
                        next(new apiError.Generic());
                        return;
                    }

                    response = {
                        board,
                        viewCounts: newCount,
                    };
                    next(200, response);
                });
            })
            .catch((error) => {
                next(error.statusCode || 500, error);
                return;
            });
    },
};

