var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./UserModel');
var UserService = require('./UserService');
const jwt = require('jsonwebtoken');

//User list

router.get('/',UserService.getUsers);

//register User

router.post('/', UserService.register);

//Change User details

router.put('/',UserService.update);

//Delete User

router.delete('/', UserService.deleteUser);

//Get USer by ID

router.get('/getByUserID', UserService.getByUserID);






module.exports = router;