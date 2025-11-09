import express from 'express';
import employeeRouter from './routes/employeeRoutes.js';

const app = express()
const port = 3000

app.use(express.json())

app.use('/v1/employees', employeeRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
