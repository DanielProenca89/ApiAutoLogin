const Connection = require('./conn')
const config = require('./config/config.json')

async function createUser(req, res){

    try{
    const conn = new Connection(config.auth)
    conn.connect()
    let user = ""
    let password = ""
    if(req.body){
        user = req.body.user;
        password = req.body.password
    }

    let insertUser = await conn.insert('users', {user:user})
    let id = insertUser[0].insertId
    await conn.insert('passwords', {userId:id, password:password})
    res.status(200).json({msg:'ok', error:''})
    }catch(error){
    res.status(500).json({msg:'error', error:error})
    console.log(error)
    }



}

module.exports = {createUser};