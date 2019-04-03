const express = require('express');
const app = express();

const path = require('path'); //manejar rutas/direcciones del servidor
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan'); //logeo de peticiones http
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); //procesar información desde el navegador al servidor
const session = require('express-session');
const { Client } = require('pg');

// require('./config/passport')(passport);

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //Configurar motor de plantillas

//Configurar y probar conexión a base de datos.
const client = new Client({
    user: 'postgres',
    password: '6932124',
    database: 'login-register',
    host: 'localhost',
    port: 5432
});
client.connect();
client.query('SELECT $1::text as message', ['testing'], (err, res) => {
    if(err) {
        console.log("Error al conectar con la base de datos.");
        return;
    }
    client.query('SELECT * FROM users', (err, res) => {
        if(err) {
            console.log("Error: No existe la tabla \"users\".");
            return;
        }
        console.log("Conectado a la base de datos.");
        client.end();
    });
});

//middlewares
app.use(morgan('dev')); //Logeo de peticiones al servidor
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false})); //interpretar información de formularios a través de url
app.use(session({
    secret: 'kajwg45s2',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Rutas
require('./app/routes')(app, passport);

//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Server encendido en puerto', app.get('port'));
});