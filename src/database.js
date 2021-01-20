const mysql = require('mysql-await');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electron-db',
})

db.connect();

function getConnection() {
    return db;
}

module.exports = {
    getConnection
}