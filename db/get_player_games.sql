SELECT * FROM games
WHERE player_id = $1
ORDER BY game_id DESC;