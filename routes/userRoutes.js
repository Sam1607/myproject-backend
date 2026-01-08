const express = require('express');
const { getUsers, createUsers, editUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users',getUsers)
router.post('/users/create',createUsers)
router.put('/users/edituser/:id',editUser)
router.delete('/users/deleteuser/:id',deleteUser); 

module.exports = router;
