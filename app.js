const express = require('express')
const app = express()
const port = 3001
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`express is running on http:// localhost: ${port}`)
  })