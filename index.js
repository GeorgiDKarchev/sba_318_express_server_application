const express = require ('express');
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const morgan = require('morgan');
const usersMiddleware = require('./middlewares/usersMiddleware');
const productsMiddleware = require('./middlewares/productsMiddleware')

const app = express();
const port = 3000;

//Middleware
app.use(morgan('dev'));
app.use(usersMiddleware);
app.use(productsMiddleware);
app.use(express.static('./styles'));
app.use(express.static('./assets'));

app.set('view-engine', 'ejs');

//mehod inbuild in express to recgnise the incomming reques as string or array
//app.use(express.json())this is recognising json data
app.use(express.urlencoded({extendet:false}));

app.get ('/',(req, res)=>{
    res.render('index.ejs')
});


//Routes
app.get('/login', (req,res)=>{
    res.render('login.ejs')
});
app.use('/users', users);
app.use('/products', products)
app.use('/orders', orders)


//viewing individul user
app.get('/users/:id', (req, res) => {
    const user = users.find((u)=>u.id == req.params.id);
    if (user) res.json(user);
});

//viewing individual order
app.get('/orders/:id', (req, res) => {
    const order = orders.find((o)=>o.id == req.params.id);
    if (order) res.json(order);
});
//app.use( express.json());
//app.use(express.urlencoded({exttended:true}));

app.post('/login', (req,res)=>{
    res.redirect('/index.ejs')
})

//rerouting all routes to main page
app.all('*', (req,res)=>{
    res.redirect('/');
});

//custom middleware - we add this last so itcan be processed after everything elase
app.use((req, res)=>{
    res.status(404);
    res.json({error: 'resource not found'});
});

app.listen(port, () =>{
    console.log(` Server listening on port: ${port}`);
});
