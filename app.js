// Imports
require('dotenv').config();
const express = require('express');
const routers = require('./routers');  
//const cors = require('cors');

// Instanciate server
const app = express(); 

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'req.headers.origin');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, UPDATE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-requested-With, X-HTTP-Method-Override');
    res.header('Access-Control-Allow-Credentials', true);

   next();
 };
  app.use(allowCrossDomain); 
// var corsOptions = { credentials: true,
//                     allowedHeaders: 'Accept, Content-Type, Authorization,append,delete,entries,foreach,get,has,keys,set,values',
//                     preflightContinue: true,
//                     methods: 'GET, PUT, POST, DELETE, OPTION',
//                     optionSuccessStatus: true
// };
//app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded())
app.use(routers); 

// Launch server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});