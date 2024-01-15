const express = require ("express");
const router = express.Router();

const products = require("../data/products");

router.route("/").get((req, res) => {
    res.json(products);
});
 


module.exports = router;