const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlsSchema = new Schema({
  originalURL: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  // this path is missing
  shortURL: {
    type: String,
    required: true,
  }
})
module.exports = mongoose.model('URL', urlsSchema)