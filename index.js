
const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public', {
  index: 'index.html'
}));
app.get('/capital/:id', require('./routes/avatar/capital'));
app.get('/avatar/capital/:id', require('./routes/avatar/capital'));
app.get('/qrcode/:data', require('./routes/qrcode'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
