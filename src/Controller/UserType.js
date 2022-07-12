import { openDB } from "../configDB.js";


export async function createTableUserType(req, res){
    openDB().then(db=>{
        let vazio = true
        db.exec('CREATE TABLE IF NOT EXISTS UserType ( usertypeid INTEGER PRIMARY KEY, usertypename TEXT UNIQUE)')
        db.all('SELECT COUNT(*) FROM UserType').then(quantity=>{    
            if(quantity === 0){
                console.log(vazio)
                db.run('INSERT INTO UserType (usertypename) VALUES ("Morador")')
                db.run('INSERT INTO UserType (usertypename) VALUES ("Bixo")')
                db.run('INSERT INTO UserType (usertypename) VALUES ("Agregado")')
            }
        })
    })
}
