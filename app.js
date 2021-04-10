// Imports
require('dotenv').config();
const express = require('express');
const routers = require('./routers');

// Instanciate server
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(routers);

// Launch server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});