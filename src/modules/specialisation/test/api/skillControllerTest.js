let testIniter = require('../../../../core/tests/testIniter');
let testHelpers = require('../../../../core/tests/testHelpers');

describe('skillController', () => {
    
    testHelpers.authTestEmployee();
    
    it('/skills/:profileId([0-9]+)', (done) => {
        testIniter.getChaiRequest()
            .get("/specialisation/skills/1")
            .set("Content-Type", "application/json")
            .set('Cookie', testIniter.getCookie())
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    
    
    testHelpers.logout();
    
});