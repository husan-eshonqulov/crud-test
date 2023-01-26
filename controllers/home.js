const User = require('../models/user');

exports.getHome = (req, res) => {
  User.fetchAll()
    .then((users) => {
      res.render('user/users', { pageTitle: 'Home', users });
    })
    .catch((err) => {
      throw err;
    });
};
