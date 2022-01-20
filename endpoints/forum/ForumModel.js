const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;


const forumSchema = ({
    forumName: {
        type: String,
        required: true,
    },
    forumDescription: {
        type: String,
        required: true,
    },
    user: { 
        type: Schema.Types.ObjectId,
        
        ref: 'user',
        
    },
    published_on: {
        type: String,
        default: moment().format("LLL")
    },
});


module.exports = mongoose.model('Forum', forumSchema);



