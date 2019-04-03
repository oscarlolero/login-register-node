const LocalStrategy = require('passport-local').Strategy;
const PostgreSQLClient 
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        // done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // user.findbyid()
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, inPassword, done) {
        const query = `SELECT * FROM users WHERE username = '${username}'`;

        sql.query(database.msurl, query, (err, rows) => {
            if(err) {
                done(null, false, req.flash('loginMessage', 'Error al conectar con la base de datos.'));
                return console.log(err);
            }
            if(rows.length == 0) {
                return done(null, false, req.flash('loginMessage', 'El usuario no existe.'));
            }
            if(rows[0].user_pass != inPassword)  {
                return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
            }
            return done(null, rows[0]);
        });
    }));
}