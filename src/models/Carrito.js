const { Schema, model } = require('mongoose')

const carritoSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  productos: {
    type: Array,
    required: true
  }
})

module.exports = model('carrito', carritoSchema)