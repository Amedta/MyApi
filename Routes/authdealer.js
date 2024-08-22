const express = require('express');
const router = express.Router();
const { DisplayUser,DisplaySomething,InsertUser,UpdateUser,DeleteUser} = require('../Controllers/dealer');

router.get('/displayUser', DisplayUser);
router.get('/displaySomthing', DisplaySomething);
router.post('/InsertUser', InsertUser);
router.patch('/UpdateUser/:Users_id', UpdateUser);
router.delete('/DeleteUser/:Users_id', DeleteUser);

module.exports = router;