const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const todoSchema = new mongoose.Schema({
    todoText : {
        type : String,
        required : true,
        trim : true
    },
    complated : {
        type : Boolean,
        default : false
    }
},{collection:'Todo', timestamps: true})

const todo = mongoose.model("Todo", todoSchema)

module.exports = todo