const {Pool} = require('pg');



const client =  new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})


client.connect();


module.exports = client;