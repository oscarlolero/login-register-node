const LocalStrategy = require('passport-local').Strategy;
const pool = require('./../config/database');
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, inPassword, done) {
        const query = `SELECT * FROM users WHERE username = '${username}'`;
        (async () => {
            //Verificar que los datos sean correctos
            try {
                const res = await pool.query(query);
                if(res.rowCount == 0) {
                    return done(null, false, req.flash('loginMessage', 'El usuario no existe.'));
                }
                if(res.rows[0].password != inPassword)  {
                    return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
                }
                return done(null, res.rows[0]);
            } catch(err) {
                return done(null, false, req.flash('loginMessage', 'Error al conectar con la base de datos.'));
            }
        })();
    }));
}