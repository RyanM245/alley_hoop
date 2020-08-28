INSERT INTO players (username,password,email,pic)
VALUES
($1, $2, $3, $4)
RETURNING *;
