const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res, next) => {
        // console.log('look at the req:', req.body)
        const { email, password } = req.body;
        const db = req.app.get('db');
        const result = await db.user_login([email]);
        const existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('Email has already been used');
        } 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.new_user([email, hash]);
        const user = newUser[0];
        req.session.user = { email: user.account_name, id: user.account_id };
        return res.status(201).send(req.session.user);
    },


    login: async (req, res) => {
        
        const { email, password } = req.body;
        const foundUser = await req.app.get('db').user_login([email]);
        const user = foundUser[0];
        if(!user) {
            return res.status(401).send('User not found. Please register as a new user before loggin in')
        }
        // const isAuthenticated = bcrypt.compareSync(password, user.password);
        if (!bcrypt.compareSync(password, user.account_pass)) {
            return res.status(403).send('Incorrect password');
        }
        req.session.user = { email: user.account_name, id: user.account_id,  };
        return res.send(req.session.user);
    },
    
    logout: (req, res) => {
   
        req.session.destroy();
        return res.sendStatus(200)
    }
}