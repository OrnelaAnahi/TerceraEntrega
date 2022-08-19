const { Schema, model } = require('mongoose')

const productsSchema = new Schema({
  producto: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    default: 0
  },
  imagen: String,
})

module.exports = model('product', productsSchema)