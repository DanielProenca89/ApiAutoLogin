const Connection = require('./conn')
const config = require('./config/config.json')
const crypto = require('crypto');


function encrypt(token, ts, data){
    // Cria um valor hash SHA-256 a partir da chave
    const key = crypto.createHash('sha256').update(token).digest('hex').slice(0,32);

    // Cria um valor hash SHA-128 a partir da chave
    const iv = crypto.createHash('sha1').update(ts).digest('hex').slice(0,16);
    console.log(iv)

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(decrypt(token, ts, encrypted))
    return encrypted

}
// Descriptografia

function decrypt(token, ts, encrypted){

    const key = crypto.createHash('sha256').update(token).digest('hex').slice(0,32);

    // Cria um valor hash SHA-128 a partir da chave
    const iv = crypto.createHash('sha1').update(ts).digest('hex').slice(0,16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

async function getRules(req, res){

    try{
    const conn = new Connection(config.tools)
    conn.connect()
        console.log(req.query)
    const link  = req.query.link
    const token = req.headers['x-access-token']
    const ts = req.query.ts
    const query  = await conn.get_result("select * from vw_rules where link = ?", {link:link})

    if(query[0]){
        const encryptedInfo = encrypt(token, ts, JSON.stringify(query[0]))
        res.status(200).json({data:encryptedInfo})
    }else{
        res.status(204).json({data:""})
    }

}catch(error){
    console.log(error)
    res.status(500).json({error})

}
}

module.exports = {getRules}

