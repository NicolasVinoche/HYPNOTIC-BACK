require('dotenv').config();

const { Client } = require('pg');
const users = require('../data/users.json'); 
const packs = require ('../data/pack.json');

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
        
        await client.query(`INSERT INTO users(first_name, last_name, role, email, password, pseudo)
                            VALUES ($1, $2, $3, $4, $5, $6)`, [
                                user.first_name,
                                user.last_name,
                                user.role,
                                user.email,
                                user.password, 
                                user.pseudo
                            ]);

    } 
    
    for(let pack of packs){
        console.log("Insertion de la table packs :", pack.title); 

        await client.query(`INSERT INTO packs(title, content, price, tag) 
                            VALUES ($1, $2, $3, $4)`, [
                                pack.title, 
                                pack.content, 
                                pack.price, 
                                pack.tag
                            ]);
    }

    console.log("disconnected")
    await client.end();

})();