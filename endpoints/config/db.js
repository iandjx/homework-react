const mongoose = require('mongoose');
const dbURI = "mongodb://localhost:27017/gamerforum";

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