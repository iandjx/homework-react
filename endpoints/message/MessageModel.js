const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    forumID: {
        type: Schema.Types.ObjectId, ref: "Forum"
    },
    messageText: {
        type: String,
    },
    user: { 
        type: Schema.Types.ObjectId, ref: 'user' 
    },
    createdDate: {
        type: Date

    },
});

 module.exports = mongoose.model("Message", MessageSchema);
