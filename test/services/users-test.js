const chai = require('chai');
const dirtyChai = require('dirty-chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiDateTime = require('chai-datetime');
const Users = require('../../src/services/users');
const Postgres = require('../../src/connectors/postgres');
const ApiError = require('@prodigy/api').Error;

const { expect } = chai;

chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiDateTime);

describe('Users', () => {
    let sandbox;
    const UsersTest = new Users();
    expect(UsersTest).to.not.be.null();

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('#getUser', () => {
        it('is a function', () => {
            expect(Users.getUser).to.be.a('function');
        });
        it('should return user data', () => {
            const now = Date.now();
            const data = {
                id: 1,
            };
            const connections = {};

            sandbox.stub(Postgres, 'getUser').resolves(
                {
                    id: 1,
                    username: 'Randy Marsh',
                    modifiedDate: now,
                }
            );

            Users.getUser(data, connections)
                .then((response) => {
                    expect(response.id).to.be.equal(1);
                    expect(response.username).to.be.equal('Randy Marsh');
                    expect(response.modifiedDate).to.be.equal(now);
                });
        });
        it('should return an error if a promise state is rejected', (done) => {
            const data = {
                id: 1,
            };
            const connections = {};

            sandbox.stub(Postgres, 'getUser').rejects(new ApiError.Generic());

            return new Promise((reject) => {
                Users.getUser(data, connections)
                    .catch((error) => {
                        expect(error.statusCode).to.be.equal(500);
                        reject(error);
                        done();
                    });
            });
        });
    });
});
