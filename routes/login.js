const {login, verifyJWT} = require('../controller/login') 
const express = require('express')
const router = express.Router()

//rota de login
router.post('/login',login)

module.exports = router
