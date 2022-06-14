const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
    teacherName : {
        type : String,
        required : true
    },
    maxNoStudent : {
        type : Number,
        required : true
    },
    classLocation: {
        type : String,
        required : true
    },
    subject: {
        type : String,
        required : true
    }
})

const Class = mongoose.model("Class",classSchema);

module.exports = Class;