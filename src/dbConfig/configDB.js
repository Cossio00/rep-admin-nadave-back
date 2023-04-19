const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "rootadminpassword",  
        database: "repadmin"
    }
};
module.exports = config;




/*
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports= {
    async openDB(){
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    })
}}

*/