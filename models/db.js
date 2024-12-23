const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Database connection
const db = mysql.createConnection({
    DB_HOST: 'junction.proxy.rlwy.net',
    DB_USER: 'root',
    DB_PASSWORD: 'mMOnuUptkGCApYyjsYCgmjhVstWuphVr',
    DB_NAME:'railway',
    DB_PORT: 8080
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database');
    }
});



/*
const createDatabase = 'CREATE DATABASE IF NOT EXISTS foodwaste;';

db.query(createDatabase, (err) => {
    if(err) {
      console.error('Error creating database', err.message);
    }
    else {
      console.log('Database created or already exists');
    }
})

// Create 'users' table if it doesn't exist
const createUsersTable = `
   CREATE TABLE IF NOT EXISTS Users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NULL,
    password VARCHAR(100) NULL,
    role VARCHAR(100) NULL,
    email VARCHAR(100) NULL
);

`;

db.query(createUsersTable, (err) => {
    if (err) {
        console.error('Error creating users table:', err.message);
    } else {
        console.log('Users table created or already exists.');
    }
});

// Create 'food_listings' table if it doesn't exist
const createFoodListingsTable = `
    CREATE TABLE IF NOT EXISTS food_listings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        amount INT NOT NULL,
        location VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

db.query(createFoodListingsTable, (err) => {
    if (err) {
        console.error('Error creating food listings table:', err.message);
    } else {
        console.log('Food listings table created or already exists.');
    }
});
*/

module.exports = db;