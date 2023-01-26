const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/users', adminController.getUsers);
router.post('/delete-user', adminController.postDeleteUser);

module.exports = router;
