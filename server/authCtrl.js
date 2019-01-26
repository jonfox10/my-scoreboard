const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        // console.log('look at the req:', req.body)
        const dbInstance = req.app.get('db');
        let { email, password } = req.body;
        console.log('body:', email, password)
        let pwd = bcrypt.hashSync(password, 10);
        password = pwd;
        let account = await dbInstance.user_login([email])
        if (!account[0]) {
            let newUser = await dbInstance.new_user([email, pwd]);
            //   console.log('HERE:', newUser)
                req.session.user = newUser[0];
                res.status(200).send(newUser[0]);
        } else {
            res.send("Account Already Exists. Please go back and log in, or use a different email address.")
        }

    },
    login: (req, res) => {
        const dbInstance = req.app.get('db');
        const { email, password } = req.body;
        console.log(email, password);
        dbInstance.user_login(email)
            .then((user) => {
                console.log('Here:', user)
                if (bcrypt.compareSync(password, user[0].account_pass)) {
                    delete user[0].account_pass;
                    req.session.user = user[0];
                    console.log('Look up here:', user[0])
                    res.status(200).send(user[0]);
                } else {
                    res.status(401).send({ error: "Invalid Username or password." });
                    // console.log(res)
                }
            })
            .catch(err => {
                res.status(500).send(err);
                // console.log(err)
            })
    },
    logout: (req, res) => {
        // console.log('req:', req)
        if (req.session.user) {
            req.session.destroy();
            res.status(200).send({ message: "Successfully logged out." })
        }
    }
}