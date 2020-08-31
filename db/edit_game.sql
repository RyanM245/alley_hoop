UPDATE games
SET 
address = ${address},
city = ${city},
state_abbrev = ${state_abbrev},
date = ${date},
time = ${time}
WHERE 
game_id = ${game_id}
RETURNING *;