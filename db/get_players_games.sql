SELECT g.address, g.city, g.state_abbrev, g.date, g.time,p.username,p.pic FROM games g 
JOIN players p 
ON p.player_id = g.player_id
ORDER BY game_id DESC; 