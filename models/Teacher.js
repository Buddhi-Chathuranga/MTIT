const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;