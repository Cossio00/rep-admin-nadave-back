const { openDB } = require('../dbConfig/configDB');

module.exports={
    async createTableUserType(){
        openDB().then(db=>{
            
            db.exec('CREATE TABLE IF NOT EXISTS usertype ( usertypeid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, usertypename TEXT UNIQUE);')
            db.get('SELECT COUNT(*) FROM usertype').then(quantity=>{    
                if(quantity['COUNT(*)'] === 0){
                    db.run(`INSERT INTO usertype (usertypename) VALUES ('Admin')`)
                    db.run('INSERT INTO usertype (usertypename) VALUES ("Morador")')
                    db.run('INSERT INTO usertype (usertypename) VALUES ("Bixo")')
                    db.run('INSERT INTO usertype (usertypename) VALUES ("Agregado")')
                }
            })
        })
    },

    async selectUserTypes(req, res){
        openDB().then(db=>{
            try{
                db.all('SELECT * FROM usertype')
                .then(userType => {
                        res.status(202).json(userType)});
            }catch(err){
                return res.status(400).json({message: 'Erro ao listar.'});
            }
        })
    },

    async selectUserType(req, res){
        let { usertypeid } = req.params
        openDB().then(db=>{
            try{
                db.get('SELECT * FROM usertype WHERE usertypeid = ?', usertypeid)
                .then(userType => {
                    if(userType == null){
                        res.status(400).json({message: 'Tipo de Usuário não existente'})
                    }
                    else
                        res.status(202).json(userType)});
            }catch(err){
                return res.status(400).json({message: 'Erro ao retornar tipo de usuário.'});
            }
        })
    }
}