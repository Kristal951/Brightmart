const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    imageURI: String,
    name: String,
    price: Number,
    description: String,
    category: String,
    availableStock: Number,
},{timestamps: true})

module.exports = mongoose.model('Product', productSchema)
