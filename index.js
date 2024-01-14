const express = require ('express');
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');

const app = express();
const port = 3000;



app.use( express.json());
//app.use(express.urlencoded({exttended:true}));




app.listen(port, () =>{
    console.log(` Server listening on port: ${port}`);
});
