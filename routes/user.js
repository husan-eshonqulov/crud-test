const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/add-user', userController.getAddUser);
router.post('/add-user', userController.postAddUser);

module.exports = router;
