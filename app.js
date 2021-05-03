// Imports
require('dotenv').config();
const express = require('express');
const routers = require('./routers');  
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 

const app = express(); 
app.use(cookieParser()); 

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