const User = require('../models/user');

exports.getUsers = (req, res) => {
  User.fetchAll()
    .then((users) => {
      res.render('admin/users', { pageTitle: 'Admin', users });
    })
    .catch((err) => {
      throw err;
    });
};

exports.getAddUser = (req, res) => {
  res.render('admin/add-user', { pageTitle: 'Add User', editing: false });
};

exports.postAddUser = (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const userName = req.body.username;
  const password = req.body.password;
  const createAt = new Date();
  const updateAt = new Date();

  const user = new User(
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

exports.getEditUser = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      res.render('admin/add-user', {
        pageTitle: 'Edit User',
        editing: true,
        user,
      });
    })
    .catch((err) => {
      throw err;
    });
};

exports.postEditUser = (req, res) => {
  const userId = req.body.userId;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;
  const updateAt = new Date();

  User.editById(userId, firstname, lastname, username, password, updateAt)
    .then((r) => {
      if (r[0].affectedRows === 0) {
        return res.send('not edited');
      }
      res.redirect('/admin/users');
    })
    .catch((err) => {
      throw err;
    });
};

exports.postDeleteUser = (req, res) => {
  const userId = req.body.userId;
  if (userId) {
    User.deleteById(userId)
      .then((r) => {
        if (r.affectedRows === 0) {
          return res.render('user/username-taken');
        }
        res.redirect('/admin/users');
      })
      .catch((err) => {
        throw err;
      });
  }
};
