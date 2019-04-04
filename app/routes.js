const pool = require('./../config/database');
module.exports = (app, passport) => {

    // app.get('/index', (req,res) => {
    //     if(req.isAuthenticated()) {
    //         res.render('index');    
    //     } else {
    //         res.redirect('/login');
    //     }
    // });

    // app.get('/login', (req,res) => {
    //     if(req.isAuthenticated()) {
    //         res.redirect('/index');  
    //     } else {
    //         res.render('login', {
    //             message: req.flash('loginMessage')
    //         });
    //     }
    // });

    // app.post('/login', passport.authenticate('local-login' , {
    //     successRedirect: '/index',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // }));

    // app.get('/logout', (req,res) => {
    //     req.logout();
    //     res.render('login', {
    //         message: req.flash('loginMessage')
    //     });
    // });

    app.get('/register', (req,res) => {
        res.render('register', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/register', async (req,res) => {
        console.log(req.body);
        let query = `SELECT userid FROM users WHERE username = '${req.body.username}'`;
        try {
            const res = await pool.query(query);
            if(res.rowCount != 0) {
                console.log('usuario ya existe');
                return req.flash('signupMessage', 'El usuario ya existe.');
            }
            query = `INSERT INTO users(userid, username, password, permiso1, permiso2, permiso3) 
            VALUES (DEFAULT, '${req.body.username}', '${req.body.password}', true, true, true);`;   
            await pool.query(query);
            req.flash('signupMessage', 'Usuario creado.');
        } catch(err) {
            req.flash('signupMessage', 'Error al conectar con la base de datos.');
            console.log(err);
        } finally {
            res.redirect('/register');
        }
    });
};