module.exports = (app, passport) => {
    app.get('/', (req,res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/login', passport.authenticate('local-login' , {
        successRedirect: '/yay',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get('/logout', (req,res) => {
        req.logout();
        res.redirect('/login');
    });

    app.get('/logout', (req,res) => {
        req.logout();
        res.redirect('/login');
    });
};