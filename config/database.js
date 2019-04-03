const { Client } = require('pg');
const PostgreSQLClient = new Client({
    user: 'postgres',
    password: '6932124',
    database: 'login-register',
    host: 'localhost',
    port: 5432
});

module.exports = PostgreSQLClient;