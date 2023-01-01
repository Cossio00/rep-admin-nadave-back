const { openDB } = require('../configDB');

module.exports={
    
    async createTableUser(){
        openDB().then(db=>{
            db.exec('CREATE TABLE IF NOT EXISTS User(userid INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, usernickname TEXT, useremail TEXT, userpassword TEXT, userage INTEGER, userperiod TEXT, usertypeid INTEGER NOT NULL, FOREIGN KEY(usertypeid) REFERENCES UserType(usertypeid))')
            db.get('SELECT COUNT(*) FROM User').then(quantity=>{    
                if(quantity['COUNT(*)'] === 0){
                db.run('INSERT INTO User (username, usernickname, usertypeid) VALUES ("Republica Admin", "Caixinha", 1)')
                }
            })
        })
    },

    async selectUsers(req, res){
        openDB().then(db =>{
                try{
                    db.all('SELECT * FROM User')
                    .then(users => res.status(201).json(users))
            }catch(err){
                return res.status(400).json({message: 'Erro ao listar.'});
            }
        })
    },
    
    async selectUser(req, res){
        let { userid } = req.params
        openDB().then(db =>{
            try{
                db.get('SELECT * FROM User WHERE userid = ?', [userid])
                .then(user => res.status(201).json(user))
            }catch(err){
                return res.status(400).json({message: 'Erro ao retornar usuário.'});
            }
        })
    },

    async insertUser(req, res){
        const {
            username,
            usernickname,
            useremail,
            userpassword,
            userage,
            userperiod,
            usertypeid
        } = req.body
        
        openDB().then(db =>{    
            try{
                db.run('INSERT INTO User (username, usernickname, useremail, userpassword, userage, userperiod, usertypeid) VALUES (?,?,?,?,?,?,?)', [username, usernickname, useremail, userpassword, userage, userperiod, usertypeid])
                .then(res.status(202).json({message: 'Cadastro realizado com sucesso.'}))
            }catch(err){
                return res.status(400).json({message: 'Erro ao cadastrar usuário.'});
            }
        })
    },

    async updateUser(req, res){
        const {
            username,
            usernickname,
            useremail,
            userpassword,
            userage,
            userperiod,
            usertypeid
        } = req.body
        let { userid } = req.params;
        openDB().then(db =>{
            try{
                db.run('UPDATE User SET username=?, usernickname=?, useremail=?, userpassword=?, userage=?, userperiod=?, usertypeid=? WHERE userid=?', [username, usernickname, useremail, userpassword, userage, userperiod, usertypeid, userid])
                .then(res.status(202).json({message: 'Usuario alterado com sucesso.'}))
            }catch(err){
                return res.status(400).json({message: 'Erro ao atualizar usuário.'});
            }
        })
    
    },

    async deleteUser(req, res){
        let { userid } = req.params;
        openDB().then(db =>{
            try{
                db.get('DELETE FROM User WHERE userid = ?', [userid])
                .then(res.status(201).json({message: 'Usuario excluído com sucesso.'}))
            }catch(err){
                return res.status(400).json({message: 'Erro ao deletar usuário.'});
            }
        })
        
    }
}