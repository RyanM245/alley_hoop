UPDATE players
SET 
username = ${username},
email = ${email},
pic = ${pic}
WHERE 
player_id = ${player_id};
