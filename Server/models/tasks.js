const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        require: true
    },
    done:{
        type: Boolean,
        require: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('Tasks',taskSchema);