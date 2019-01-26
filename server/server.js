require('dotenv').config();
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const massive = require('massive')
// const bcrypt = require('bcryptjs')
const ctrl = require('./controller')
const authCtrl = require('./authCtrl')

const app = express()



const {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING
} = process.env



massive(CONNECTION_STRING).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('connected to the db')
})
.catch((err) => {
    console.log(err);
})


app.use(bodyParser.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

// Auth endpoints
app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/login`, authCtrl.login);
app.delete(`/auth/logout`, authCtrl.logout);

app.get(`/api/games`, ctrl.getGames)
// app.get(`/api/accountInfo/:account_id`, endpointCtrl.retrieveAccountInfo)

app.post(`/api/game`, ctrl.addGame);



app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`))