const mysql = require('mysql2');

let connection;

function getConnection() {
    if (!connection) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '2001',
            database: 'tour'
        });

        connection.connect((err) => {
            if (err) throw err;
            console.log('MySQL Connected...');
        });
    }
    return connection;
}

module.exports = getConnection;
