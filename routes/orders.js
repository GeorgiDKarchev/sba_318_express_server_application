const express = require ("express");
const router = express.Router();

const orders = require("../data/orders");

router.route("/").get((req, res) => {
    res.json(orders);
});

router.post("/create", (req,res)=>{
    res.send("Creating a new order...")
});


module.exports = router;