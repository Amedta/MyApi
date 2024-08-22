const express = require('express');
const router = express.Router();
const { Employee,Register,Login,Update,Delete,} = require('../Controllers/employee');
router.get('/Employee', Employee);
router.post('/Register', Register);
router.post('/Login', Login);
router.patch('/Update/:Employee_id', Update);
router.delete('/Delete/:Employee_id', Delete);

module.exports = router;
