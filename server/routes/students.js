var express = require('express');
var router = express.Router();
var db = require('../controllers/firebaseInit')

router.get('/', function(req, res, next) {
    console.log("================ LIST =================");
    db.collection("Student").get().then((querySnapshot) => {
        let students = []
        querySnapshot.forEach((doc) => {
            students.push(doc.data());
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
        res.render('students',{ students: students })
    });
});

router.post('/add', function(req, res, next) {
    console.log("================ ADD =================");
    db.collection("Student").add({
        ID: "xxxx",
        name: req.body.name
    })
    .then(function(docRef) {
        res.send("Document written with ID: " + docRef.id)
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        res.send("Error adding document: " + error)
        console.error("Error adding document: ", error);
    });
});

module.exports = router;


