const mongoose = require('mongoose');
 
const roomSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    maxcount : {
        type : Number,
        required : true
    },
    phonenumber : {
        type : Number,
        required : true
    },
    rentperday : {
        type : Number,
        required : true
    },
    imageurls : [],
    currentbooking : [],
    type : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}
,{
    timestamps : true,
})

module.exports  = mongoose.model('Room',roomSchema)
