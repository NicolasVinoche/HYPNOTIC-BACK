// Imports
require('dotenv').config();
const express = require('express');
const routers = require('./routers');

// Instanciate server
const app = express(); 

//var allowCrossDomain = function (req, res, next) {
    //res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Headers', 'Content-Type');
   // next();
 // };
  //app.use(allowCrossDomain);

app.use(express.json());
app.use(express.urlencoded());
app.use(routers);

// Launch server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});