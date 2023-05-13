const Connection = require('./conn')
const config = require('./config/config.json')

async function teste(){

    const conn  = new Connection(config.auth)
    conn.connect()
    let insert = await conn.insert('users', {user:'teste2'})
    console.log(insert)
    
}

teste()