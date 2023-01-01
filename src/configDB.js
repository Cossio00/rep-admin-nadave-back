const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports= {
    async openDB(){
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    })
}}