module.exports = (app, passport) => {
    app.get('/', (req,res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/login', (req,res) => {

    });
};