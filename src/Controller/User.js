const { openDB } = require('../dbConfig/configDB');

module.exports={
    
    async createTableUser(){
        openDB().then(db=>{
            db.exec(`
                CREATE TABLE IF NOT EXISTS user(
                userid INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL, 
                usernickname TEXT,
                useremail TEXT, 
                userpassword TEXT,
                userage INTEGER,
                userperiod TEXT,
                usertype INTEGER NOT NULL,
                FOREIGN KEY (usertype) 
                REFERENCES usertype(usertypeid)
                )`
            )
            /*db.get('SELECT COUNT(*) FROM user').then(quantity=>{    
                if(quantity['COUNT(*)'] === 0){
                db.run('INSERT INTO user (username, usernickname, usertypeid) VALUES ("Republica Admin", "Caixinha", 1)')
                }
            })*/
        })
    },

    async selectUsers(req, res){
        openDB().then(db =>{
            try{
                    db.all('SELECT * FROM user')
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
                db.get('SELECT * FROM user WHERE userid = ?', userid)
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
            usertype
        } = req.body
        
        openDB().then(db =>{
            
            try{
                db.get(`SELECT * FROM usertype WHERE usertypeid = ?`, usertype)
                //db.run('INSERT INTO user (username, usernickname, useremail, userpassword, userage, userperiod, usertype) VALUES (?,?,?,?,?,?,?)', [username, usernickname, useremail, userpassword, userage, userperiod, usertype])
                db.run('INSERT INTO user (username, usernickname, useremail, userpassword, userage, userperiod, usertype) VALUES (?,?,?,?,?,?,?)', [username, usernickname, useremail, userpassword, userage, userperiod, usertype])
                .then(res.status(202).json({message: 'Cadastro realizado com sucesso.'}))
            }catch(err){
                return res.status(400).json({message: 'Erro ao cadastrar usuário.'});
            }
            //db.run('INSERT INTO user (username, usernickname, useremail, userpassword, userage, userperiod, usertypeid) VALUES (?,?,?,?,?,?,?)', [username, usernickname, useremail, userpassword, userage, userperiod, usertypeid])
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
            usertype
        } = req.body
        let { userid } = req.params;
        openDB().then(db =>{
            try{
                db.run('UPDATE user SET username=?, usernickname=?, useremail=?, userpassword=?, userage=?, userperiod=?, usertype=? WHERE userid=?', [username, usernickname, useremail, userpassword, userage, userperiod, usertype, userid])
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
                db.get('DELETE FROM user WHERE userid = ?', [userid])
                .then(res.status(201).json({message: 'Usuario excluído com sucesso.'}))
            }catch(err){
                return res.status(400).json({message: 'Erro ao deletar usuário.'});
            }
        })
        
    }
}