module.exports = {
    addGame: async (req, res) => {
        console.log('Game is saved');
        let {sport,
             teamOne,
             teamTwo,
             periodMinutes
        } = req.body;
        let {account_id} = req.session.user;
        const db = req.app.get('db');
        let game = await db.add_game([sport, teamOne, teamTwo, periodMinutes, account_id]);
        console.log('this is the game info: ', game);
        res.status(200).send(game)
    },
    getGames: (req, res, next) => {
        let {account_id} = req.session.user;
        req.app.get('db').read_games([account_id])
         .then( game => {
             res.status(200).send(game)
         })
         .catch((err) => {
             res.sendStatus(500);
             console.log(err);
         })
 
     }
}