const chatService = require('../services/chatService');
const logger = require('../../../utils/logger');

module.exports.func = (router) => {
    
    router.get('/chats/all', async (req, res) => {
        try {
            let chats = await chatService.getAllChats(req.user);
            res.json(chats)
        } catch (err) {
            logger.error(err.stack);
            res.status(500).json({error: err});
        }
    });

    router.post('/chats/create', async (req, res) => {
        let name = req.body.name;
        let users = req.body.users;
        users.push(req.user.id);
        let chat = await chatService.save(name);
        for (i = 0; i < users.length; ++i) {
            await chatService.addUserToChat(chat, parseInt(users[i]));
        }
        return res.send(chat.id);
    });

    return router;

};

