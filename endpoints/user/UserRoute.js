var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./UserModel');
var UserService = require('./UserService');
const jwt = require('jsonwebtoken');
const AuthenticationService = require('../authentication/AuthenticationService');
const verifyToken = require('../middleware/verifyToken.js');

//router.use(verifyToken);

//User list

router.get('/',verifyToken,UserService.getUsers);

//router.post('/',UserService.login);

//register User

router.post('/',UserService.register);

//Change User details

router.put('/',verifyToken,UserService.update);

//Delete User

router.delete('/:id',verifyToken,UserService.deleteUser);

//Get User by ID

router.get('/getByUserID', verifyToken,UserService.getByUserID);




module.exports = router;