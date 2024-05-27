const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'p@ssword',
    database: 'dietplan'
});

connection.connect((err) => {
    if (err) {
        return console.error('error connecting: ' + err.stack);
    }
    console.log('connected as id ' + connection.threadId);

    connection.query('SELECT * FROM food_nutrients', (error, results, fields) => {
        if (error) throw error;

        results.forEach(row => {
            console.log(row);
        });

        connection.end((err) => {
            if (err) {
                return console.log('error: ' + err.message);
            }
            console.log('Connection closed.');
        });
    });
});
