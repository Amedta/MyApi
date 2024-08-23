const mysql = require('mysql2');
const db1Connection = mysql.createConnection(process.env.DATABASE_URL);
db1Connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('MySQL successfully connected to the database!!!');
});
module.exports = db1Connection;


