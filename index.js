
const express = require('express')
const app = express()
const port = 3000

app.get('/capital/:id', require('./routes/capital'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
