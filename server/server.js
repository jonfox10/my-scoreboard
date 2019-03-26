require('dotenv').config();
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const massive = require('massive')
const ctrl = require('./controller')
const authCtrl = require('./authCtrl')
const auth = require('./authMiddleware')

const app = express()



const {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING
} = process.env


// const massiveInstance = massive.connectSync({connectionString: CONNECTION_STRING});

// app.set('db', massiveInstance);

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected to the db')
})
.catch((err) => {
    console.log(err);
})


app.use(bodyParser.json())
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SECRET,
}))

// Auth endpoints
app.post(`/auth/register`, authCtrl.register);
app.post(`/auth/login`, authCtrl.login);
app.get(`/auth/logout`, authCtrl.logout);

app.get(`/api/games/user`, auth.usersOnly, ctrl.getUserGame)
// app.get(`/api/accountInfo/:account_id`, authCtrl.retrieveAccountInfo)

app.post(`/api/game`, auth.usersOnly, ctrl.addGame);
app.delete(`/api/game/:id`, ctrl.deleteOne);
// app.put('/api/game', ctrl.update);


app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`))