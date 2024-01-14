const express = require ('express');
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');

const app = express();
const port = 3000;

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


//app.use( express.json());
//app.use(express.urlencoded({exttended:true}));

app.post('/login', (req,res)=>{

})


app.listen(port, () =>{
    console.log(` Server listening on port: ${port}`);
});
