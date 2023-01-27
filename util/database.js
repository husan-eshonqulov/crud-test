const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'crud-test',
  password: process.env.PASSWORD,
});

// pool.execute(`CREATE TABLE 'crud-test'.'users' (
//   'id' INT NOT NULL AUTO_INCREMENT,
//   'firstname' VARCHAR(45) NOT NULL,
//   'lastname' VARCHAR(45) NOT NULL,
//   'username' VARCHAR(45) NOT NULL,
//   'password' VARCHAR(60) NOT NULL,
//   'createdAt' DATETIME NOT NULL,
//   'updatedAt' DATETIME NOT NULL,
//   PRIMARY KEY ('id'),
//   UNIQUE INDEX 'id_UNIQUE' ('id' ASC) VISIBLE,
//   UNIQUE INDEX 'username_UNIQUE' ('username' ASC) VISIBLE)`);

module.exports = pool.promise();
