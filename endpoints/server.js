const express = require('express');
const mongoose = require('mongoose');
const dbURI = "mongodb://localhost:27017/gamerforum";
const bodyParser = require('body-parser');
const cors = require('cors');
const UserService = require('./user/UserService');
const https = require('https');
const fs = require('fs');
const http = require('http');
const path = require('path');


// Initialize the app
const app = express();
require('dotenv').config();
app.use("*",cors());
app.use(express.json());
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(cors(corsConfig));
// Defining the Middlewares

app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser);
// BodyParser Middleware
app.use(bodyParser.json());

app.get("/", (req, res,next) => {
    
});



app.use(function (req, res, next) {
    //console.log('Time:', Date.now())
    next()
  })

// Bring in the user routes
const users = require('./user/UserRoute');
const forum = require('./forum/ForumRoute');
const publicusers = require('./user/PublicUserRoute');
const authenticate = require('./authentication/AuthenticationRoute');
const message = require('./message/MessageRoute');
//
app.get('/', (req, res) => {
    return res.json({
        message: "Welcome to the gamerforum"
    });
});
//
app.use('/publicUser', publicusers);
app.use('/publicUser', users);
app.use('/user',users);
app.use('/authenticate',authenticate);
app.use('/forum',forum);
app.use('/forumMessage',message)


//CONNECTION
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

db.on("error", (err)=>{console.error(err)});
db.once("open", () => { 
    UserService.createDefaultUser();
    console.log ("Database started successfully")})

// Defining the PORT for http

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`HTTP Server started on Port -> :${PORT}`);
});

const privateKey  = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};


const secureServer = https.createServer(credentials, app);
secureServer.listen(443, () => {
    console.log('HTTPS server listening on Port -> :443');
});