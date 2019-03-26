module.exports = {
    getUserGame: async (req, res) => {
        const games = await req.app.get('db').read_games([req.session.user.id])
        return res.status(200).send(games)
    },
    addGame: async (req, res) => {
        const {sport, teamOne, teamTwo, periodMinutes} = req.body;
        const { id } = req.session.user;
        // const account_id = req.session.id;
        const games =  await req.app.get('db').add_game([sport, teamOne, teamTwo, periodMinutes, id]);
        return res.status(200).send(games)

    },

    deleteOne: (req, res) => {
        const {params} = req;
        req.app.get('db').delete_game(params.id)
        .then( (games) => {
            res.status(200).send(games)
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log(err);
        })
    }

    // update: (req, res) => {
    //     const {game_id, team_one, team_two, minutes_per_peroid} = req.body; 
    //     req.app.get('db').update_game([game_id, team_one, team_two, minutes_per_peroid])
    //     .then((games) => {
    //         res.status(200).send(games)
    //     })
    //     .catch((err) => {
    //         res.sendStatus(500);
    //         console.log (err);
    //     })
    // },
}