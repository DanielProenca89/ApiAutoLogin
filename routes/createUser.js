//const {verifyJWT} = require('../controller/login')
const {createUser} = require('../controller/createUser')
const express = require('express')
const router = express.Router()

//rota de login
router.post('/user',createUser)

module.exports = router