const passport = require('passport');

module.exports.func = (router) => {

    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(500).send({success: false, message: 'authentication failed'});
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                next();
            });
        })(req, res, next);
    }, function (req, res) {
        res.json({
            user: req.user
        });
    });

    router.get('/logout', async (req, res) => {
        req.session.destroy();
        res.json('success');
    });


    return router;

};
