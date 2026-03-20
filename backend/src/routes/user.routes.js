const express = require('express');
const {
  loginController,
  registerController,
} = require('../controller/user.controller');
const router = express.Router();

router.post('/register', registerController); // register new user
router.post('/login', loginController); // login existing user

module.exports = router;
