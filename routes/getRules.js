const {verifyJWT} = require('../controller/login')
const {getRules} = require('../controller/getRules')
const express = require('express')
const router = express.Router()

//rota de login
router.get('/rules',verifyJWT,getRules)

module.exports = router