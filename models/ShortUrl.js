const mongoose = require('mongoose')
const uuid = new ShortUniqueId({ length: 5 })
const Schema = mongoose.Schema
const urlsSchema = new Schema({
  fullUrl: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  shortUrl: {
    type: String,
    required: true,
    default: uuid
  }
})
module.exports = mongoose.model('ShortUrl', urlsSchema)