const chai = require('chai');
const dirtyChai = require('dirty-chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiDateTime = require('chai-datetime');
const ApiError = require('@prodigy/api').Error;
const Routes = require('../../src/routes/user');
const Users = require('../../src/services/users');

const { expect } = chai;

chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiDateTime);


describe('api', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getUser', () => {
        before(() => {
            this.route = Routes.getUser;
        });
        after(() => {
            delete this.route;
        });

        it('should have a method of get', () => {
            expect(this.route.method).to.equal('get');
        });

        it('should have an endpoint of /base-game-api/user/:id', () => {
            expect(this.route.endpoint).to.equal('/base-api/user/:id');
        });

        it('should not require session authentication', () => {
            expect(this.route.session_auth).to.be.false();
        });

        it('should not require application authentication', () => {
            expect(this.route.application_auth).to.be.false();
        });

        describe('inputs', () => {
            before(() => {
                this.inputs = this.route.inputs;
            });

            after(() => {
                delete this.inputs;
            });

            describe('id', () => {
                it('should be a required input', () => {
                    expect(this.inputs.id.required).to.be.true();
                });
                it('should only validate a greater than 0 value', () => {
                    expect(this.inputs.id.validate(1)).to.be.true();
                    expect(this.inputs.id.validate(0)).to.be.false();
                });
                it('should format ID into an int', () => {
                    expect(this.inputs.id.formatter('1')).to.equal(1);
                });
            });

            describe('username', () => {
                it('should not be a required input', () => {
                    expect(this.inputs.username.required).to.be.false();
                });
            });
        });

        describe('run', () => {
            before(() => {
                this.run = this.route.run;
            });
            after(() => {
                delete this.run;
            });

            it('should return user data', () => {
                const connections = {};
                const data = {
                    id: 1,
                };
                const now = Date.now();
                sandbox.stub(Users, 'getUser').resolves(
                    {
                        id: 1,
                        username: 'Randy Marsh',
                        modifiedDate: now,
                    }
                );

                this.run(connections, data, ((statusCode, response) => {
                    expect(statusCode).to.be.equal(200);
                    expect(response.id).to.be.equal(1);
                    expect(response.username).to.be.equal('Randy Marsh');
                    expect(response.modifiedDate).to.be.equal(now);
                }));
            });

            it('should return an error if a promise state is rejected', () => {
                const connections = {};
                const data = {
                    id: 1,
                };

                sandbox.stub(Users, 'getUser').rejects(
                    new ApiError.Generic()
                );

                this.run(connections, data, ((error) => {
                    expect(error.statusCode).to.be.equal(500);
                }));
            });
        });
    });
});
