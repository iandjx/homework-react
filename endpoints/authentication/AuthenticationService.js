const UserModel = require('../user/UserModel');
var User = require('../user/UserModel');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthenticationService = require('../authentication/AuthenticationService');
const mongoose = require('mongoose');
require("dotenv").config();
const generateToken = require("../utils/generateToken.js");

const SECRET_KEY = process.env.JWT_KEY;


exports.register = async (req,res) =>{
   const userExist = await User.findOne({ userID: req.body.userID});
   if(userExist) return res.status(400).send('User exists');

   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password, salt);

   const users = new User({
     userID: req.body.userID,
     userName: req.body.userName,
     isAdministrator: req.body.isAdministrator,
     password: hashPassword,
  
   });
   try{
     const savedUser = await users.save();
     res.send(savedUser);
   }catch(err){
     res.status(400).send(err);
   }
}

exports.login = async (req,res) =>{

  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [userID, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  const user = await User.findOne({ userID: userID });
  const userName = user.userName;
  const isAdministrator = user.isAdministrator;
  if(!user) return res.status(400).send('User not found');
  const validPass = await bcrypt.compare(password, user.password);
  if(!validPass) return res.status(400).send('Incorrect Password');

  const token = generateToken(user._id, userID,userName,isAdministrator);
  
  return res.header('Authorization', 'Bearer ' + token).json({ token });
}

exports.update = async (req,res,next) => {

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const result = await User.findOneAndUpdate(
          {
              userID: req.token.userID,
          },
          {
              password: hashedPassword
            
          },
          
          {
              upsert: true,
              new: true
          }
      )
      res.send(result);
  }catch(err){
      res.status(401).json(err);
  }
}


exports.getByUserID = function (req, res, next) {
  User.findById(req.body.userID, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
}

exports.getUsers = async (req, res) => {
    try{
      const users = await User.find();
      response.status(200).json(users);
    }catch(error){
      response.status(404).json({ message: error.message })
    }
};
  

exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (user) {
      await userremove();
      res.json({ message: "User Removed" });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  };


