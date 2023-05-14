const Connection = require('./conn')
const config = require('./config/config.json')
const data = require('./config/rules.json')

async function teste(){

    const conn  = new Connection(config.tools)
    conn.connect()

    data.forEach(async e=>{
        conn.insert('links', {link:e.url}).then((data)=>{
            return data[0].insertId
        }).then(async (id)=>{
            await conn.insert('rules', {linkId:id, inputUserXpath:e.inputUserXpath, inputPwdXpath:e.inputPwdXpath, submitXpath:e.submitXpath})
            await conn.insert('access', {linkId:id, user:e.user, password: e.password})
        }).finally(()=>{return 'ok'})
        
    })

     
    
}

teste()