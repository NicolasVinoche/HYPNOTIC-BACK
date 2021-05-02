// Imports
require('dotenv').config();
const express = require('express');
const routers = require('./routers');  
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 

const app = express(); 
app.use(cookieParser()); 

// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', ['http://localhost:8080/', 'https://sami-fekkar.xyz/']);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Language, Upgrade-Insecure-Requests, Content-Type, X-requested-With, X-HTTP-Method-Override, X-Custom-Header, Content-Encoding');
//     res.header('Access-Control-Allow-Credentials', true);

//    next();
// };
 // app.use(allowCrossDomain);
var corsOptions = {
                   origin: 'https://hypnoticpeafowl.com/',
                   allowedHeaders: 'Content-Type, Accept, Origin, Authorization',
                   preflightContinue: false,
                   methods: 'GET, PUT, POST, DELETE, PATCH',
                   credentials: true
}; 
app.use(cors(corsOptions)); 
 
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:90000})) 
app.use(routers); 

// Launch server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});