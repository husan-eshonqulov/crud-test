const db = require('../util/database');

class User {
  constructor(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  save() {
    return db
      .execute('SELECT * FROM users WHERE username = ?', [this.username])
      .then((users) => {
        if (users[0].length !== 0) return 'username taken';
        return db.execute(
          'INSERT INTO users (firstname, lastname, username, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
          [
            this.firstname,
            this.lastname,
            this.username,
            this.password,
            this.createdAt,
            this.updatedAt,
          ]
        );
      })
      .catch((err) => {
        throw err;
      });
  }

  static fetchAll() {
    return db
      .execute('SELECT * FROM users')
      .then((users) => users[0])
      .catch((err) => {
        throw err;
      });
  }

  static findById(id) {
    return db
      .execute('SELECT * FROM users WHERE id = ?', [id])
      .then((users) => users[0][0])
      .catch((err) => {
        throw err;
      });
  }

  static deleteById(id) {
    return db
      .execute('DELETE FROM users WHERE id = ?', [id])
      .then((res) => res[0])
      .catch((err) => {
        throw err;
      });
  }

  static editById(id, updatedUser) {
    return this.findById(id)
      .then((user) => {
        return db.execute(
          'UPDATE users SET firstName = ?, lastName = ?, username = ?, password = ?, updatedAt = ? WHERE id = ?',
          [
            updatedUser.firstname,
            updatedUser.lastname,
            updatedUser.username,
            updatedUser.password,
            updatedUser.updatedAt,
            id,
          ]
        );
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = User;
