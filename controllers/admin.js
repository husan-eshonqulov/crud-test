const User = require('../models/user');

exports.getUsers = (req, res) => {
  User.fetchAll()
    .then((users) => {
      res.render('admin/users', { pageTitle: 'Addmin', users });
    })
    .catch((err) => {
      throw err;
    });
};
