// On utilise Pool plutôt qu'un client unique 

const { Pool } = require('pg'); 

const client = new Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false
    }
}); 

// Le répartiteur se charge de connecter les client quand il y en aura -pas de client.connect()-

module.exports = client;