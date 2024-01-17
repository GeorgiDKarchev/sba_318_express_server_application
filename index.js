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


// app.get ('/',(req, res)=>{
//    res.render('index.ejs')
// });


//Routes
//app.get('/login', (req,res)=>{
// res.render('login.ejs')
//});
app.use('/users', users);
app.use('/products', products)
app.use('/orders', orders)

//Adding HATEOS links 
app.get('/', (req, res) => {
    res.json({
        links: [
            {
                href: '/users',
                rel: 'users',
                type:'GET',
            },
            {
                href: '/orders',
                rel: 'orders',
                type:'GET',
            },
            {
                href: '/products',
                rel: 'products',
                type:'GET',
            },
            {
                href: '/login',
                rel: 'login',
                type:'GET',
            },

        ],

    });
});

app.get('/login', (req,res)=>{
    res.render('login.ejs')
})



//custom middleware - we add this last so it 
//can be processed after everything else
app.use((req, res)=>{
    res.status(404);
    res.json({error: 'Resource not found'});
});

//We can redirect the user or use the above 404 when page doesn not exist
//rerouting all routes to main page
// I tried to redirect the page on a button click to index.ejs
// app.all('/login', (req,res)=>{
//    res.redirect('index.ejs');
// }); 

app.listen(port, () =>{
    console.log(` Server listening on port: ${port}`);
});
