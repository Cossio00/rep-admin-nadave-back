import { Router } from "express";
import { createTableUser, insertUser, updateUser, selectUsers, selectUser, deleteUser } from './Controller/User.js'

const router = Router();

router.get('/users', selectUsers)
router.get('/user/:userid', selectUser)
router.post('/user', insertUser)
router.delete('/user/:userid', deleteUser)

export default router;