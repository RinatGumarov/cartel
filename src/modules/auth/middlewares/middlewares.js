const authMiddleware = require('./authMiddleware');

module.exports.func = (router) => {
    
    router.get('/logout', authMiddleware);
    
    return router;
};
