const { Router } = require('express');
//import { insertUser, updateUser, selectUsers, selectUser, deleteUser } from "./Controller/User"
//import { selectUserTypes } from "./Controller/UserType"; 
//import { selectOperations, insertOperation } from "./Controller/Operation";

const router = Router();
const { selectUserTypes } = require('./Controller/UserType');
const { insertUser, updateUser, selectUsers, selectUser, deleteUser } = require('./Controller/User');
const { selectOperations, insertOperation, selectOperationsByUser } = require('./Controller/Operation');


router.get('/usertypes', selectUserTypes)

router.get('/users', selectUsers)
router.get('/user/:userid', selectUser)
router.post('/user', insertUser)
router.put('/user/:userid', updateUser)
router.delete('/user/:userid', deleteUser)

router.get('/operations', selectOperations)
router.get('/operations/:userid', selectOperationsByUser)
router.post('/operation', insertOperation)

module.exports = router;