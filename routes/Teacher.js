const router = require("express").Router();
let teacher = require("../models/Teacher");

router.route("/test").get((req, res) => {

    return res.json("Pass Teacher");

})

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const subject = req.body.subject;
    const phone = req.body.phone;

    const newTeacher = new teacher({
        name,
        address,
        subject,
        phone
    })

    newTeacher.save().then(() => {
        res.json("Teacher Added")
    }).catch((err) => {
        res.json(err.message);
    })

})

router.route("/get").get((req, res) => {
    teacher.find().then((Teachers) => {
        res.json(Teachers)
    }).catch((err) => {
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, address, subject, phone } = req.body;

    const updateTeacher = {
        name,
        address,
        subject,
        phone
    }

    const update = await teacher.findByIdAndUpdate(userId, updateTeacher)
        .then(() => {
            res.status(200).send({ status: "Teacher updated" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error while updateing", error: err.message() });
        })
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await teacher.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "Teacher deleted" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error while deleting", error: err.message() });
        })
})

router.route("/getOne/:id").get(async (req, res) => {
    let id = req.params.id;
    const user = await teacher.findById(id, function (err, Teacher) {
        return res.json(Teacher)
    }).catch((err) => {
        return res.json(err)
    })
})

module.exports = router;