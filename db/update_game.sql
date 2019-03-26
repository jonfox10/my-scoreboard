UPDATE game
SET (team_one, team_two, minutes_per_peroid) =
($2, $3, $4)
WHERE game_id = $1;

SELECT *
FROM game;