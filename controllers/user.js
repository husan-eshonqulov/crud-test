const User = require('../models/user');

exports.getUsers = (req, res) => {
  User.fetchAll()
    .then((users) => {
      res.render('user/users', { pageTitle: 'Users', users });
    })
    .catch((err) => {
      throw err;
    });
};

exports.getAddUser = (req, res) => {
  res.render('user/add-user', { pageTitle: 'Add User' });
};

exports.postAddUser = (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const userName = req.body.username;
  const password = req.body.password;
  const createAt = new Date();
  const updateAt = new Date();

  const user = new User(
    null,
    firstName,
    lastName,
    userName,
    password,
    createAt,
    updateAt
  );

  user
    .save()
    .then((r) => {
      if (r === 'username taken') {
        return res.render('user/username-taken');
      }
      res.redirect('/users');
    })
    .catch((err) => {
      throw err;
    });
};
