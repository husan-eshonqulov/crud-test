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
