const express = require('express')
const router = express.Router()
const { getHome, nameGreeting } = require('../controllers/helloWorldController')

router
  .get('/', getHome)

  .get('/user', nameGreeting)

module.exports = router
