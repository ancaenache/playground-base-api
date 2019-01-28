const Users = require('../services/users');

/**
 * @api {get} /base-api/user/:id Get user data
 * @apiName getUser
 * @apiGroup base-api
 * @apiDescription Get data for a given user
 *
 * @apiParam  {Number} userID Eg. 23423
 * @apiParam  {String} username Eg. 'Randy Marsh'
 *
 * @apiSuccess (200) {Number} userID
 * @apiSuccess (200) {String} username
 * @apiSuccess (200) {DateTime} modifiedDate
 */

exports.getUser = {
    name: 'getUser',
    method: 'get',
    endpoint: '/base-api/user/:id',
    desc: 'sample get route for retrieving user data',
    session_auth: false,
    application_auth: false,
    version: 'v1',
    inputs: {
        id: {
            required: true,
            formatter: value => parseInt(value, 10),
            validate: value => value > 0,
        },
        username: {
            required: false,
        },
    },
    run: (connections, data, next) => {
        Users.getUser(data, connections)
            .then((result) => {
                next(200, result);
            })
            .catch((error) => {
                next(error);
            });
    },
};

