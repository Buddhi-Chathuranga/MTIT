const router = require("express").Router();
let Payment = require("../models/Payment");

router.route("/test").get((req, res) => {

    return res.json("Pass Payment");

})

router.route("/add").post((req, res) => {
    const studentName = req.body.studentName;
    const teacherName = req.body.teacherName;
    const date = req.body.date;
    const amount = req.body.amount;

    const newPayment = new Payment({
        studentName: studentName,
        teacherName: teacherName,
        date: date,
        amount: amount
    })

    newPayment.save().then(() => {
        res.json("Payment Added")
    }).catch((err) => {
        res.json(err.message);
    })

})

router.route("/get").get((req, res) => {
    Payment.find().then((Payments) => {
        res.json(Payments)
    }).catch((err) => {
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { studentName, teacherName, date, amount } = req.body;

    const updatePayment = {
        studentName,
        teacherName,
        date,
        amount
    }

    const update = await Payment.findByIdAndUpdate(userId, updatePayment)
        .then(() => {
            res.status(200).send({ status: "Payment updated" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error while updateing", error: err.message() });
        })
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Payment.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "Payment deleted" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error while deleting", error: err.message() });
        })
})

router.route("/getOne/:id").get(async (req, res) => {
    let id = req.params.id;
    const user = await Payment.findById(id, function (err, Payment) {
        return res.json(Payment)
    }).catch((err) => {
        return res.json(err)
    })
})

module.exports = router;