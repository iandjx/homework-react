const MessageModel = require("../message/MessageModel");
const Message = require("../message/MessageModel");
const Forum = require("../forum/ForumModel");
const User = require("../user/UserModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

exports.getMessages = async (req, res) => {
  try {
    const comments = await Message.find();

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.create = async (req, res) => {
  const { forumID, messageText } = req.body;
  const token = req.token;
  try {
    const owner = await User.findOne({ userID: token.userID });

    const message = await new Message({
      forumID,
      messageText,
      user: owner.userID,
    });
    message.user = owner;
    await message.save();

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getByOwnerID = function (req, res, next) {
  Message.find({ forumID: req.body.messageText })
    .then((doc) => {
      if (!doc) {
        return res.status(400).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

exports.getByToken = async (req, res, next) => {
  Forum.find({ userID: req.token.userID })
    .then((doc) => {
      if (!doc) {
        return res.status(400).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

exports.update = async (req, res) => {
  try {
    const result = await Message.findOneAndUpdate(
      {
        forumID: req.body._id,
      },
      {
        messageText: req.body.messageText,
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.send(result);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.delete = async (request, response) => {
  try {
    await Message.findByIdAndDelete({ _id: request.params.id });
    console.log(request.params.id);
    response.status(201).json("Message deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
