if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express()
const port = 3000
const URL = require('./models/URL')

// url shortener function
function shortener(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let count = 0;
  while (count < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    count += 1;
  }
  return result;
}

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
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
  const id = shortener(5)
  // checks if a record with the given 'originalURL' already exists in the database
  // if so, returns the existing record with its 'shortURL'
  URL.findOne({ originalURL: req.body.url })
    .then(data => {
      if (data) {
        res.render('index', { origin: req.headers.origin, shortURL: data.shortURL })
      } else {
  // If no, creates a new 'URL' document with the generated 'shortId' and the submitted 'originalURL' 
  // and saves it to the database
        const newURL = new URL({ originalURL: req.body.url, shortURL: id })
        return newURL.save()
          .then(data => {
            res.render('index', { origin: req.headers.origin,shortURL: data.shortURL })
          })
      }
    })
    .catch(err => console.log(err))
})

app.get('/:shortURL', (req,res) => {
  const shortURL = req.params.shortURL
  // look if the params already exist in the database
  URL.findOne({ shortURL })
    .then(data => {
      // if yes, redirect to 'originalURL'
      if (data) {
        res.redirect(data.originalURL)
      } else {
      // if not, send error message
      res.render('error')
      }
    })
})

app.listen(port, () => {
    console.log(`express is running on http:// localhost: ${port}`)
  })