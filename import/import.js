require('dotenv').config();

const { Client } = require('pg');
const users = require('../data/users.json');

const client = new Client({ connectionString: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false
    } });

(async () => {
    await client.connect()
    console.log("connected")

    await client.query('TRUNCATE TABLE users, subscriptions, projects, masterclasses, packs, albums, streams, tips, _m2m_user_tips, _m2m_user_projects, _m2m_user_packs, _m2m_user_subscriptions RESTART IDENTITY');

    for(let user of users){
        console.log("Insertion de la table users :", user.first_name);
        
        await client.query(`INSERT INTO users(first_name, last_name, role, email, password)
                            VALUES ($1, $2, $3, $4, $5)`, [
                                user.first_name,
                                user.last_name,
                                user.role,
                                user.email,
                                user.password
                            ]);

    }

    console.log("disconnected")
    await client.end();

})();