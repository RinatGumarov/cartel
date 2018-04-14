const usersService = require('../services/userService');
const messageService = require('../../message/services/messageService');

const logger = require('../../../utils/logger');

module.exports.func = (router) => {

    /**
     * шаг регистрации с высыланием проверочного кода на почту
     */
    router.post('/signup/email', async (req, res) => {
        req.session.email = req.body.email;
        req.session.verifyCode = messageService.sendCodeToUser(req.body.email);
        res.json({data: 'success'});

        logger.log(req.session.verifyCode);
    });

    /**
     * шаг проверки высланного кода на почту
     * если пароль верный то регистрируем и аунтифицируем
     * пользователя
     */
    router.post('/signup/verification', async (req, res) => {
        try {
            if (req.session.verifyCode === parseInt(req.body.verifyCode)) {
                let user = await usersService.getUserByEmail(req.session.email);
                if (user) {
                    user.id = user.dataValues.id;
                    req.login(user, (err) => {
                        if (err) {
                            res.status(401)
                                .json({error: 'Unauthorized'});
                        } else {
                            res.json({
                                user
                            });
                        }
                    });
                } else {
                    res.json({isNewUser: true});
                }
            } else {
                res.status(400).json('code mismatch');
            }
        } catch (err) {
            logger.error(err.stack);
            res.status(500)
                .json({
                    error: err.message
                });
        }
    });

    router.post('/signup/login', async (req, res) => {
        let email = req.session.email;
        let login = req.body.login;
        let user = await usersService.saveUser(email, login);
        req.login(user, (err) => {
            if (err) {
                res.status(401)
                    .json({error: 'Unauthorized'});
            } else {
                res.json({user});
            }
        });
    });

    /**
     * метод удаления пользователя из системы
     */
    router.delete('/unreg', async (req, res) => {
        if (await usersService.deleteUser(req.user)) {
            res.json({data: 'success'});
        } else {
            res.status(500)
                .json('server error');
        }
    });

    return router;

};
