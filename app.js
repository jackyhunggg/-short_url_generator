if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express()
const port = 3000
const ShortUrl = require('./models/ShortUrl')
const shortId = require('shortid')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/shortUrls', async (req, res) => {
    const fullUrl = req.body.fullUrl
    const id = shortId.generate()
    ShortUrl.findOne({ fullUrl })
      .then((data) => {
        if(data) {
          ShortUrl.create({ id, fullUrl })
        }
      })
      .then(data => 
        res.render('index', {fullUrl, shortURL: data.shortURL}))
      .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`express is running on http:// localhost: ${port}`)
  })