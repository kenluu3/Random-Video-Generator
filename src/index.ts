import express from 'express'

const port = 8080
const app = express()

app.listen(port, () => {
  console.log(`Server started and listening on port: ${port}`)
})