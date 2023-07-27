const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        require :true
    },
    email:{
        type: String,
        require: true
    },

    password:{
        type: String,
        require: true
    },
    Tasks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Tasks'
        }
    ],
    otp:{type:Number},
    otpExpire:{type:Number},
    
    username:{
        type: String,
        require : true
    }
})

module.exports=mongoose.model('User',userSchema);


