const pool = require('./../config/database');
module.exports = (app, passport) => {

    app.get('/index', checkAuthentication, (req,res) => {
        let permisos = [req.session.passport.user.permiso1, req.session.passport.user.permiso2, req.session.passport.user.permiso3];

        if(req.session.passport.user.username == 'admin') {
            res.redirect('/register');
        } else {
            res.render('index', {
                username: req.session.passport.user.username,
                permisos: permisos
            });
        }
    });

    app.get('/login', (req,res) => {
        if(req.isAuthenticated()) {
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

    app.get('/logout', checkAuthentication, (req,res) => {
        req.logout();
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/register', checkAuthentication, (req,res) => {
        
        //Verificar que el usuario es administrador
        if(req.session.passport.user.username != 'admin') {
            console.log('Usuario no autorizado quizo acceder a /register.');
            return res.redirect('/index');
        }
        res.render('register', {
            message: req.flash('signupMessage'),
            messageError: req.flash('signupMessageError')
        });
    });

    app.post('/register', checkAuthentication, async (req,res) => {
        let query;
        let permisos = [];

        try {
            //Verificar los checkbox seleccionados y llenar el array que contiene los permisos que el usuario tiene expresado en bool.
            if(req.body.permisos) {
                permisos = [req.body.permisos.includes('1'), req.body.permisos.includes('2'), req.body.permisos.includes('3')];
            } else {
                permisos = [false, false, false];
            }
            //Verificar si el usuario existe en la base de datos
            query = `SELECT userid FROM users WHERE username = '${req.body.username}'`;
            const res = await pool.query(query);
            if(res.rowCount != 0) {
                console.log('usuario ya existe');
                return req.flash('signupMessageError', 'El usuario ya existe.');
            }
            //Crear el usuario en la base de datos
            query = `INSERT INTO users(userid, username, password, permiso1, permiso2, permiso3) 
            VALUES (DEFAULT, '${req.body.username}', '${req.body.password}', ${permisos[0]}, ${permisos[1]}, ${permisos[2]});`;   
            await pool.query(query);
            req.flash('signupMessage', 'Usuario creado.');

        } catch(err) {
            req.flash('signupMessageError', 'Error al conectar con la base de datos.');
            console.log(err);
        } finally {
            //Haya o no error, regresar a la página de registro
            res.redirect('/register');
        }
    });
};

let checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        req.isAuthenticated();
        next();
    } else{
        res.redirect("/login");
    }
}