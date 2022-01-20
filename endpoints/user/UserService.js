const User = require("../user/UserModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthenticationService = require("../authentication/AuthenticationService");
const e = require("express");
const mongoose = require("mongoose");
// Siehe server.js -> Muss nur einmal gemacht werden
//require("dotenv").config();
const atob = require("atob");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { response } = require("express");

const SECRET_KEY = process.env.TOKEN_KEY;

exports.createDefaultUser = async (req, res) => {
  const userExist = await User.findOne({ userID: "admin" });
  if (userExist) return "User exists";

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("123", salt);

  const users = new User({
    userID: "admin",
    userName: "admin",
    isAdministrator: true,
    password: hashPassword,
  });
  try {
    const savedUser = await users.save();
    res.send(savedUser);
    res.json("Admin Successfully Added");
  } catch (err) {
    return err;
  }
};

exports.register = async (req, res) => {
  const userExist = await User.findOne({ userID: req.body.userID });
  if (userExist) return res.status(400).send("User exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const users = new User({
    userID: req.body.userID,
    userName: req.body.userName,
    isAdministrator: req.body.isAdministrator,
    password: hashPassword,
  });
  try {
    const savedUser = await users.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [userID, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  const user = await User.findOne({ userID: userID });

  if (!user) return res.status(400).send("User not found");
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Incorrect Password");

  //const token = generateToken(user.userID);
  const token = jwt.sign({ _id: user._id, userID: user.userID }, SECRET_KEY);
  //req.token = token;
  //res.header('Authorization', token).json(token);
  return res.json({ token });
};

exports.update = async (req, res, next) => {
  const userName = "";
  const password = "";
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const result = await User.findOneAndUpdate(
      {
        userID: req.body.userID,
      },
      {
        userName: req.body.userName,
        password: hashedPassword,
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

exports.getByUserID = function (req, res, next) {
  User.findById(req.body.userID, { password: 0 }, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params._id);
  
    if (user.user.toString() !== req.params._id.toString()) {
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
  };*/

// deleting data of user from the database
exports.deleteUser = async (request, response) => {
  try {
    await User.findByIdAndDelete({ _id: request.params.id });
    console.log(request.params.id);
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
