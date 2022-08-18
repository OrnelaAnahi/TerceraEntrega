const mongoose = require('mongoose')
const bcrypt = require('bcrypt')




const userSchema = new mongoose.Schema({
  name: String,
  apellido: String,
  direccion: String,
  edad: Number,
  telefono: Number,
  email: String,
  password: String
})

userSchema.methods.encryptPassword = async (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.comparePassword = async (password) => {
  return bcrypt.compareSync(password, this.password)
}



const User = mongoose.model('User', userSchema)

module.exports = User