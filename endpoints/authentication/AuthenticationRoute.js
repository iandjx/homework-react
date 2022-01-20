var express = require('express');
var router = express.Router();
const UserService = require('./../user/UserService');
const AuthenticationService = require('../authentication/AuthenticationService');
const protect = require("../middleware/verifyToken.js");
const verifyToken = require('../middleware/verifyToken.js');
const User = require("../user/UserModel");
//router.use(verifyToken);

//User list

router.get('/',AuthenticationService.getUsers);

//Login user

router.post('/',AuthenticationService.login);

//Change User details

router.put('/',AuthenticationService.update);

//Delete User

router.delete('/',AuthenticationService.deleteUser);



module.exports = router;