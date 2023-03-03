const mysql = require('mysql');

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'covid19_db',
    charset: 'utf8'

    // host: 'us-cdbr-east-06.cleardb.net',
    // user: 'b617939e65e673',
    // password: 'd4712b2b',
    // database: 'heroku_af3a5cc74fd2c6a',
    // charset: 'utf8'
});

module.exports = connection;