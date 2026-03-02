const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'payment_gateway',
  waitForConnections: true, // wait for connections if there is a limit
  connectionLimit: 10, // the limit for how many connections that can exist
  queueLimit: 0, // how many can wait in queue
});

module.exports = pool;
