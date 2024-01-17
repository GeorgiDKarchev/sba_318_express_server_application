const express = require ("express");
const router = express.Router();

const usersData = require("../data/users");
//creating a post request - Adding new user 
router.route('/')
    .get((req, res) =>{
        res.json(usersData);
    })
    .post((req, res)=>{
    console.log(req.body.name)
    if (req.body.name && req.body.username && req.body.email) {
        if(usersData.find(u => u.username == req.body.username)){
            res.json ({ error: 'Username is not available'});
             return;
         }
        const user = {
            id: usersData[usersData.length -1].id +1, 
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        };
        usersData.push(user);
        res.json(usersData[usersData.length-1]);
        }else res.json({error:'Insuffitions data'});

    });

//viewing individul user
router.route('/:id')
.get((req, res,next) => {
    console.log(req.params);
    const user = usersData.find((u) =>u.id == req.params.id);
    console.log(user);
    if (user) res.json(user);
    else next();
})
.patch((req, res, next) => {
    const user = usersData.find((u, id)=>{
        if (u.id == req.params.id) {
            for (const item in req.body){
                usersData[id][item] = req.body[item];
            }
            return true;
        }
    });
    if (user) res.json(user);
    else next()
})
.delete((req, res, next) =>{
    const user = usersData.find((u, index)=>{
        if (u.id == req.params.id){
            usersData.splice(index, 1)
            return true;
        }
    });
    if (user) res.json(user);
    else next()
});


// router.route("/users").get((req, res) => {
//     res.json(users);
// });

// router.post("/create", (req,res)=>{
//     res.send("Creating a new user...")
// });



module.exports = router;