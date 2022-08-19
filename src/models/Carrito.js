const { Schema, model } = require('mongoose')

const carritoSchema = new Schema({
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

module.exports = model('carrito', carritoSchema)