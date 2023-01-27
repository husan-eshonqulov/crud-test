const db = require('../util/database');

class User {
  constructor(firstName, lastName, username, password, createAt, updateAt) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }

  save() {
    return db
      .execute('SELECT * FROM users WHERE username = ?', [this.username])
      .then((users) => {
        if (users[0].length === 0) {
          return db.execute(
            'INSERT INTO users (firstName, lastName, username, password, createAt, updateAt) VALUES (?, ?, ?, ?, ?, ?)',
            [
              this.firstName,
              this.lastName,
              this.username,
              this.password,
              this.createAt,
              this.updateAt,
            ]
          );
        } else {
          return 'username taken';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  static deleteById(id) {
    return db
      .execute('DELETE FROM users WHERE id = ?', [id])
      .then((res) => {
        return res[0];
      })
      .catch((err) => {
        throw err;
      });
  }

  static editById(id, firstname, lastname, username, password, updateAt) {
    return db
      .execute('SELECT * FROM users WHERE id = ?', [id])
      .then((users) => {
        if (users[0].length !== 0) {
          return db.execute(
            'UPDATE users SET firstName = ?, lastName = ?, username = ?, password = ?, updateAt = ? WHERE id = ?',
            [firstname, lastname, username, password, updateAt, id]
          );
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  static findById(id) {
    return db
      .execute('SELECT * FROM users WHERE id = ?', [id])
      .then((users) => {
        return users[0][0];
      })
      .catch((err) => {
        throw err;
      });
  }

  static fetchAll() {
    return db
      .execute('SELECT * FROM users')
      .then((users) => {
        return users[0];
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = User;
