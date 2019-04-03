CREATE TABLE users (
	userid SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(150) NOT NULL,
	permiso1 BOOL,
	permiso2 BOOL,
	permiso3 BOOL
);