const express = require('express')

const { handleLogin } = require('../controller/UserController')
let router = express.Router();

// router.post('/api/login', handleLogin)
module.exports = router;