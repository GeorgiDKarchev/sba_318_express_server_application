const express = require ('express');

const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const morgan = require('morgan');
const usersMiddleware = require('./middlewares/usersMiddleware');
const productsMiddleware = require('./middlewares/productsMiddleware')
const usersData = require('./data/users')
const ordersData = require('./data/orders')
const app = express();
const port = 3000;

//Middleware
//app.use(express.json)
app.use(morgan('dev'));
app.use(usersMiddleware);
app.use(productsMiddleware);
app.use(express.static('./styles'));
app.use(express.static('./assets'));

app.set('view-engine', 'ejs');

//mehod inbuild in express to recgnise the incomming reques as string or array
//app.use(express.json()) this is recognising json data
app.use(express.json())
app.use(express.urlencoded({extendet: true}));

//creating a post request - Adding new user 
app.route('/users')
    .get((req, res) =>{
        res.json(usersData);
    })
    .post((req, res)=>{
    console.log(req.body)
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


app.get ('/',(req, res)=>{
    res.render('index.ejs')
});

// GET /users
app.get('/users', (req, res)=>{
    res.json(usersData);
});
// GET /orders
app.get('/orders', (req, res)=>{
    res.json(ordersData);
});
//Routes
app.get('/login', (req,res)=>{
    res.render('login.ejs')
});
app.use('/users', users);
app.use('/products', products)
app.use('/orders', orders)


//viewing individul user
app.route('/users/:id')
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

//viewing individual order with user 
app.route('/orders/:id')
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

app.post('/login', (req,res)=>{
    res.redirect('/index.ejs')
})



//custom middleware - we add this last so it 
//can be processed after everything else
app.use((req, res)=>{
    res.status(404);
    res.json({error: 'Resource not found'});
});

//We can redirect the user or use the above 404 when page doesn not exist
//rerouting all routes to main page
//app.all('/', (req,res)=>{
//    res.redirect('/');
//}); 

app.listen(port, () =>{
    console.log(` Server listening on port: ${port}`);
});
