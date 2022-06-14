const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;