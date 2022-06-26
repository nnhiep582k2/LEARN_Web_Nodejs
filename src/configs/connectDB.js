// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
});

export default pool;
