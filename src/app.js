const express = require('express');
const router = require('./routes.js');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const port = 3010;
const httpsPort = 3011;

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, ()=>console.log("API rodando..."))
https.createServer({
    cert: fs.readFileSync('./src/SSL/code.crt'),
    key: fs.readFileSync('./src/SSL/code.key')
}, app).listen(httpsPort, ()=> console.log("Rodando em HTTPS..."));