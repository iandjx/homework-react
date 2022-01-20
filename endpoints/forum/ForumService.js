const Forum = require('../forum/ForumModel');
const User = require('../user/UserModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ForumModel = require('../forum/ForumModel');

exports.getForums = async(req,res) =>{
  const forums = await Forum.find({}).populate('user');
  res.json(forums);
}


exports.create = async (req, res) => {
  const { forumName, forumDescription } = req.body;
  const token = req.token;
  const forumExist = await Forum.findOne({ forumName: req.body.forumName });
  if (forumExist) {
    
    return res.status(400).send("Forum Exists already.");

  }
  try {
    const owner = await User.findOne({ userID: token.userID });

    if (!forumName || !forumDescription) {
      return res.status(400).send('Not all fields filled in');
    } else {

      const newForum = new Forum({
        forumName,
        forumDescription,
        user: owner.userID, 
      });
      newForum.user = owner;
      await newForum.save();

      const note = await Forum.find({}).populate('user');
     
      return res.status(201).json(note);
  
    }
  } catch (err) {
   
    return res.status(400).send(err);
  }
};




exports.getByOwnerID = async (req, res, next) => {

  // Als erstes verifizieren, dass es sich um den admin handelt
  const requestingUser = req.token.userID;
  console.log('Requesting user: ', requestingUser);
  if(requestingUser !== 'admin') {
    return res.status(401).send('Only admin may use this route');
  }

  // Benutzernamen aus dem request lesen
  const { ownerID } = req.body;

  // Diesen Benutzer aus der DB ziehen
  const owner = await User.findOne({ userID: ownerID });
  if(!owner) {
  
    return res.status(404).send('Owner not found');
  }

  // Alle Foren dieses Users finden
  const forums = await Forum.find({ user: owner });

  if(forums) {
    return res.json(forums);
  } else {
    return res.status(404).json({ message: "No forums found for this user" }); 
  }

};


exports.getByToken = async (req, res, next) => {
  // User-Objekt aus der DB holen
  const user = await User.findOne({ _id: req.token._id });
  // Wenn der User nicht gefunden wird, Fehler senden
  if(!user) {
    
    return res.status(404).json({ message: 'User not found '});
  }

  // Alle Foren des Users finden
  const forums = await Forum.find({ user: user });

  if (forums) {
    return res.json(forums);
  } else {
    return res.status(404).json({ message: "No forums found for this user" });
  }
};


exports.delete = async (request,response)=>{
  try {
    await Forum.findByIdAndDelete({ _id: request.params.id });
    console.log(request.params.id);
    response.status(201).json("Forum deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

exports.update = async (req,res) => {
  try {
      const result = await Forum.findOneAndUpdate(
          {
              _id: req.body._id,
          },
          {
              forumName: req.body.forumName
          },
          {
              forumDescription: req.body.forumDescription
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


