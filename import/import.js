require('dotenv').config();

const { Client } = require('pg');
const users = require('../data/users.json'); 
const packs = require ('../data/pack.json'); 
const projects = require('../data/project.json');
const tips = require('../data/tips.json') 
const messages = require('../data/message.json');

const client = new Client({ connectionString: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false
    } });

(async () => {
    await client.connect()
    console.log("connected")

    await client.query('TRUNCATE TABLE users, subscriptions, projects, masterclasses, packs, albums, streams, tips, _m2m_user_tips, _m2m_user_projects, _m2m_user_packs, _m2m_user_subscriptions, message_contact RESTART IDENTITY');

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

    for(let project of projects){
        console.log("Insertion de la table projects :", project.title); 

        await client.query(`INSERT INTO projects(title, description, image_path, video_path) 
                            VALUES ($1, $2, $3, $4)`, [
                                project.title, 
                                project.description, 
                                project.image_path, 
                                project.video_path
                            ]);
    }

    for(let tip of tips){
        console.log("Insertion de la table tips :", tip.title); 

        await client.query(`INSERT INTO tips(title, category, image_path, video_path) 
                            VALUES ($1, $2, $3, $4)`, [
                                tip.title, 
                                tip.category, 
                                tip.image_path,
                                tip.video_path
                            ]);
    }  


    for(let message of messages){
        console.log("Insertion de la table message_contact :", message.title); 

        await client.query(`INSERT INTO message_contact(title, content, pseudo) 
                            VALUES ($1, $2, $3)` , [
                               message.title,  
                               message.content,  
                               message.pseudo
                            ]);
    }

    console.log("disconnected")
    await client.end();

})();