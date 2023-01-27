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
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newUser = new User(user);

  newUser
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
  const updatedUser = {
    userId: req.body.userId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    updatedAt: new Date(),
  };

  User.editById(updatedUser.userId, updatedUser)
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
};
