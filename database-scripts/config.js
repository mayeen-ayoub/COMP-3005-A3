const {Client} = require('pg');

const client = new Client({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: "postgres",
	database: "assignment3"	
});

module.exports = client;

