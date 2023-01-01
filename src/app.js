const UserType = require('./Controller/UserType');
const User = require('./Controller/User');
const Operation = require('./Controller/Operation');

const express = require('express');
const router = require('./routes.js');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
UserType.createTableUserType();
User.createTableUser();
Operation.createTableOperation();



app.listen(3010, ()=>console.log("API rodando..."))
https.createServer({
    cert: fs.readFileSync('./src/SSL/code.crt'),
    key: fs.readFileSync('./src/SSL/code.key')
}, app).listen(3001, ()=> console.log("Rodando em HTTPS..."));