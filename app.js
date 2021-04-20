// Imports
require('dotenv').config();
const express = require('express');
const routers = require('./routers'); 
var cookieParser = require('cookie-parser'); 
const cors = require('cors');

// Instanciate server
const app = express(); 

// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
//     res.header('Access-Control-Allow-Credentials', true);

//    next();
//  };
//   app.use(allowCrossDomain); 
var corsOptions = { credentials: true,
                    allowedHeaders: 'Accept, Content-Type',
};
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(routers); 
app.use(cookieParser());

// Launch server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});