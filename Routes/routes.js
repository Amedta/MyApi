const express = require('express');
const router = express.Router();
const AuthCheckBalanceController = require('../Controllers/CheckBalance');
router.post('/CheckBalance', AuthCheckBalanceController.CheckBalance);
module.exports = router;
