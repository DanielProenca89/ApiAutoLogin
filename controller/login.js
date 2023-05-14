require("dotenv").config();
const jwt = require('jsonwebtoken');
const Connection = require('./conn')
const config = require('./config/config.json')

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });       
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
});
}


async function login(req, res){
    const conn = new Connection(config.auth)
    conn.connect()
    const body =  Object.values(req.body)
    console.log(body)
    const query = await conn.get_result("select * from vw_auth where user = ? and password = ?", {username:body[0], password:body[1]})
    console.log(query)
    if(query[0]){ 
    const id = query[0].id; 
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn:'7d'
    });
    await conn.insert("sessions", {userId:id, token:token, startTs:new Date().toISOString()})
    return res.status(200).json({ auth: true, name:query[0].name, id:query[0].id, token: token, message:'ok'});

    }else{
    return res.status(500).json({auth:false, message: 'Invalid Login!'});
    }
}

module.exports = {login, verifyJWT};