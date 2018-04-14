const userService = require('../services/userService');

const logger = require('../../../utils/logger');

module.exports.func = (router) => {
    
    router.get('/find', async (req, res) => {
        let users = await userService.findAllByFilter(req.query.filter, req.user);
        res.send(users);
    });

    router.get('/edit', async (req, res) => {
        try {
            return res.json(await req.user);
        } catch (err) {
            logger.error(err.stack)
        }
    });

    router.get('/:id([0-9]+)', async (req,res) => {
        let user = await userService.getUserById(req.params.id);
        return res.send(user);
    });

    // router.post('/edit', async (req, res) => {
    //     try {
    //
    //     }
    // });
    
    
    return router;
    
};
