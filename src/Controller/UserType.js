const { openDB } = require('../configDB');

module.exports={
    async createTableUserType(){
        openDB().then(db=>{
            
            db.exec('CREATE TABLE IF NOT EXISTS UserType ( usertypeid INTEGER PRIMARY KEY, usertypename TEXT UNIQUE)')
            db.get('SELECT COUNT(*) FROM UserType').then(quantity=>{    
                if(quantity['COUNT(*)'] === 0){
                    db.run('INSERT INTO UserType (usertypename) VALUES ("Admin")')
                    db.run('INSERT INTO UserType (usertypename) VALUES ("Morador")')
                    db.run('INSERT INTO UserType (usertypename) VALUES ("Bixo")')
                    db.run('INSERT INTO UserType (usertypename) VALUES ("Agregado")')
                }
            })
        })
    },

        async selectUserTypes(req, res){
        openDB().then(db=>{
            try{
                db.all('SELECT * FROM UserType')
                .then(userType => res.status(202).json(userType));
            }catch(err){
                return res.status(400).json({message: 'Erro ao listar.'});
            }
        })
    }
}