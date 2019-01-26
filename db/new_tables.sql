CREATE table account (
account_id SERIAL primary key,
account_name varchar(150),
account_pass text
);

create table game (
game_id serial primary key,
sport VARCHAR(50),
team_one text,
team_two text,
minutes_per_period integer,
account_id integer REFERENCES account(account_id)
)


