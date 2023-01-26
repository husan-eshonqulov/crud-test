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

exports.postDeleteUser = (req, res) => {
  const userId = req.body.id;
  User.deleteById(userId)
    .then((r) => {
      if (r.affectedRows === 0) {
        return res.send(JSON.stringify('not exist'));
      }
      res.send(JSON.stringify('/admin/users'));
    })
    .catch((err) => {
      throw err;
    });
};
