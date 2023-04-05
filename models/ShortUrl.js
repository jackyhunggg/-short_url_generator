const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema
const urlsSchema = new Schema({
  fullUrl: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortid.generate(5)
  }
})
module.exports = mongoose.model('ShortUrl', urlsSchema)