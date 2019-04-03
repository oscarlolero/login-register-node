module.exports = (app, passport) => {
    app.get('/login', (req,res) => {
        if(req.isAuthenticated()) { //mehtodo de passport 
            res.redirect('/index');  
        } else {
            res.render('login', {
                message: req.flash('loginMessage')
            });
        }
    });
    app.post('/login', passport.authenticate('local-login' , {
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', (req,res) => {
        req.logout();
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/index', (req,res) => {
        if(req.isAuthenticated()) {
            res.render('index');    
        } else {
            res.redirect('/login');
        }
    });
};