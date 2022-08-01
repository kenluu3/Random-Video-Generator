import express from 'express'
import dotenv from 'dotenv'
import { Client } from 'pg'

dotenv.config()

const port = process.env.PORT || 8080
const app = express()

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
})

client.connect(err => {
  if (err) {
    console.error(`psql connection error: ${err}`)
  } else {
    console.log('connected to psql')
    const result = client.query('SELECT * FROM users', (err, res) => {
      if (err) throw err
      console.log(res)
      client.end()
    })
  }
})

app.listen(port, () => {
  console.log(`Server started and listening on port: ${port}`)
})