INSERT INTO game (sport, team_one, team_two, minutes_per_period, account_id)
VALUES(
    $1, $2, $3, $4, $5
)
RETURNING *;