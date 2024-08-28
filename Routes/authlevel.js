const express = require('express');
const router = express.Router();
const { DisplayLevel} = require('../Controllers/level');
router.get('/DisplayLevel', DisplayLevel);
module.exports = router;