var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Forum = require('./ForumModel');
var ForumService = require('./ForumService');
const verifyToken = require('../middleware/verifyToken.js');

//Forum list

router.get('/',ForumService.getForums);

//Create forum

router.post('/',verifyToken,ForumService.create);

//Change Forum details

router.put('/',verifyToken,ForumService.update);

//Delete Forum

router.delete('/:id', verifyToken,ForumService.delete);

//Get Forum by Token
router.get('/getByToken',verifyToken,ForumService.getByToken);

//Get Forum by ID

router.post('/getByOwnerID',verifyToken,ForumService.getByOwnerID);


module.exports = router;