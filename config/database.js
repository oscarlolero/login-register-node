const Pool = require('pg').Pool;

const config = {
    user: 'postgres',
    password: '6932124',
    database: 'login-register',
    host: 'localhost',
    port: 5432
};

const pool = new Pool(config);

module.exports = pool;