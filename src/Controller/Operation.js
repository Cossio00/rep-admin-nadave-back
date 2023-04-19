const crypto = require('crypto');
const { openDB } = require('../dbConfig/configDB');

module.exports={

    async createTableOperation(){
        openDB().then(db =>{
            db.exec('CREATE TABLE IF NOT EXISTS Operation ( operationid VARCHAR(100) PRIMARY KEY, operationdescription TEXT, operationdate DATE NOT NULL, operationvalue REAL NOT NULL, operationfinalbalance REAL, userid INTEGER NOT NULL DEFAULT 1, FOREIGN KEY(userid) REFERENCES User(userid))')
        })
    },

    async selectOperations(req, res){
        openDB().then(db=>{
            try{
                db.all('SELECT * FROM Operation')
                .then(operations => res.status(202).json(operations));
            }catch(err){
                res.status(400).json({"message":"Erro ao listar."})
            }
        })
    },

    async selectOperationsByUser(req,res){
        let { userid }= req.params
        openDB().then(db =>{
            try{
                db.all('SELECT * FROM Operation WHERE userid = ?', [userid])
                .then(operations => res.status(202).json(operations));
            }catch(err){
                res.status(400).json({"message":"Erro ao listar."})
            }
        })
    },

    async insertOperation(req, res){
        const{
            operationdescription,
            operationdate,
            operationvalue,
            operationfinalbalance,
            userid
        } = req.body;
        
        const id = crypto.randomBytes(4).toString('HEX');
        
        if (userid === undefined){
            openDB().then(db=>{
                try{
                    db.run('INSERT INTO Operation (operationid, operationdescription, operationdate, operationvalue, operationfinalbalance) VALUES (?,?,?,?,?)', [id, operationdescription, operationdate, operationvalue, operationfinalbalance])
                    .then(res.status(202).json({message: 'Cadastro realizado com sucesso.'}));
                }catch(err){
                    return res.status(400).json({message: 'Erro ao cadastrar operação!'});
                }
            })
        }else{
            openDB().then(db=>{
                try{
                    db.run('INSERT INTO Operation (operationid, operationdescription, operationdate, operationvalue, operationfinalbalance, userid) VALUES (?,?,?,?,?,?)', [id, operationdescription, operationdate, operationvalue, operationfinalbalance, userid])
                    .then(res.status(202).json({message: 'Cadastro realizado com sucesso.'}));
                }catch(err){
                    return res.status(400).json({message: 'Erro ao cadastrar operação!'});
                }
            })
        }
    }
}