const express = require ("express");
const router = express.Router();
const usersData = require("../data/users");
const ordersData = require("../data/orders");

// GET /orders
router.get('/', (req, res)=>{
    res.json(ordersData);
});
//viewing individual order with user 
router.route('/:id')
.get( (req, res, next) => {
    const user = usersData.find((u) =>u.id == req.params.id);
    console.log(user)
    const order = ordersData.find((o)=>o.userId == user.id );
    console.log(order)
    if (order.id == req.params.id ) res.json({user :user, order: order});
    else next();
})
.patch((req, res, next) => {
    const order = ordersData.find((o, id)=>{
        if (o.id == req.params.id) {
            for (const item in req.body){
                ordersData[id][item] = req.body[item];
            }
            return true;
        }
    });
    if (order) res.json(order);
    else next()
})


// router.route("/orders").get((req, res) => {
//     res.json(orders);
// });

// router.post("/create", (req,res)=>{
//     res.send("Creating a new order...")
// });


module.exports = router;