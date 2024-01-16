const express = require ("express");
const router = express.Router();

const users = require("../data/users");

router.route("/").get((req, res) => {
    res.json(users);
});

router.post("/create", (req,res)=>{
    res.send("Creating a new user...")
});

//app.route('/users')
//.get((req, res) => {
//    res.json(users);
//})
//.post((req, res) => {
//   console.log(req.body)
//});

module.exports = router;