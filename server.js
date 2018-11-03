const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

// Create ChatKit User and instantiate unique chatkit instance using the Instance Locator and Key
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:a18ca6ab-f32d-4c74-b04d-7ce9d86d1673',
  key: 'd9542246-a62f-4683-87be-382ff913d445:jsed9bL75/2zBw1P1mNMQR9z19P3c6kDEUhG3RTL7Z4=',
  })
  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Take a username with users route and create a Chatkit user through the chatkit instance
app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
  .createUser({
    id:username,
    name: username
  })
  .then(() => res.sendStatus(201))
  .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
      res.sendStatus(200)
    } else {
      res.status(error.status).json(error)
    }
  })
})

// Authenticate users and server will respond with a token returned by chatkit authenticate if request is valid
app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})