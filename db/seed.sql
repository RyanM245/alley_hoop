INSERT INTO games (player_id, address, city,state_abbrev,date,time)
VALUES
(1, '123 A St.', 'A', 'UT', 'Sep. 1st', '7 p.m.'),
(2, '456 B St.', 'B', 'CA', 'Sep. 2nd', '8 a.m.'),
(1, '789 C St.', 'C', 'AZ', 'July 20th', 'Noon');




SELECT * FROM games g 
JOIN players p
ON (g.player_id=p.player_id)
WHERE g.game_id = $1