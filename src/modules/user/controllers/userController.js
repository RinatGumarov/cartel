const userService = require('../services/userService');

const logger = require('../../../utils/logger');

module.exports.func = (router) => {
    
    router.get('/languages', async (req, res) => {
        try {
            let languages = await userService.allLanguages(req.user);
            res.json(languages);
        } catch (err) {
            logger.error(err.stack);
            return res.status(500).send({error: 'Could not get user languages'});
        }
    });
    
    router.get('/search', async (req, res) => {
        try {
            let filter = req.body.filter;
            return res.json(await userService.findAllByFilter(filter));
        } catch (err) {
            console.log(err.stack);
            return res.status(500).send({error: 'search error'});
        }
    });

    router.get('/find', async (req, res) => {
        let users = await userService.findAllByFilter(req.query.filter);
        res.send(users);
    });

    router.get('/edit', async (req, res) => {
        try {
            return res.json(await req.user);
        } catch (err) {
            logger.error(err.stack)
        }
    });

    // router.post('/edit', async (req, res) => {
    //     try {
    //
    //     }
    // });
    
    
    return router;
    
};
