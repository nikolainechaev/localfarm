const express = require('express')
const app = express()
const port = 3000

const helloWorldRouter = require('./routes/helloWorldRoute')
app.use('/', helloWorldRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
