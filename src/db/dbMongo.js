const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ornelaAnahi:1221322343@cluster0.unl79bb.mongodb.net/User?retryWrites=true&w=majority').then(()=>{
  console.log('Conectado a la base de datos')
}).catch((err)=>{
  console.log(err)
})