const router = require("express").Router();
let Class = require("../models/Class");

router.route("/test").get((req, res) => {

    return res.json("Pass Class");

})

router.route("/add").post((req, res) => {
    const teacherName = req.body.teacherName;
    const maxNoStudent = req.body.maxNoStudent;
    const classLocation = req.body.classLocation;
    const subject = req.body.subject;

    const newClass = new Class({
        teacherName: teacherName,
        maxNoStudent: maxNoStudent,
        classLocation: classLocation,
        subject: subject
    })

    newClass.save().then(() => {
        res.json("Class Added")
    }).catch((err) => {
        res.json(err.message);
    })

})

router.route("/get").get((req, res) => {
    Class.find().then((Classes) => {
        res.json(Classes)
    }).catch((err) => {
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { teacherName, maxNoStudent, classLocation, subject } = req.body;

    const updateClass = {
        teacherName,
        maxNoStudent,
        classLocation,
        subject
    }

    const update = await Class.findByIdAndUpdate(userId, updateClass)
        .then(() => {
            res.status(200).send({ status: "Class updated" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error while updateing", error: err.message() });
        })
})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Class.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "Class deleted" });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error while deleting", error: err.message() });
        })
})

router.route("/getOne/:id").get(async (req, res) => {
    let id = req.params.id;
    const user = await Class.findById(id, function (err, Class) {
        return res.json(Class)
    }).catch((err) => {
        return res.json(err)
    })
})

module.exports = router;