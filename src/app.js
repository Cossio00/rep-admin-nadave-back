import { createTableUserType } from './Controller/UserType.js';
import { createTableUser, insertUser, updateUser, selectUsers, selectUser } from './Controller/User.js'

import express from 'express';
import router from './routes.js';

const app = express();
app.use(express.json());
app.use(router);
createTableUserType();
createTableUser();


/*
app.get('/users', selectUsers)

app.get('/users/:id', selectUser)

app.post('/user', insertUser)

app.put('/user/:id', updateUser)
*/

app.listen(3010, ()=>console.log("API rodando..."))
