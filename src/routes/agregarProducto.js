const { Router } = require('express')
const router = Router()
require('../db/dbMongo.js')

const nodemailer = require('nodemailer')
const email = 'nelladelugo@gmail.com'


const Product = require('../models/Products')
const Carrito = require('../models/Carrito')
const User = require('../models/user')

router.get('/', async (req, res) => {
  let todosLosProductos = await Product.find()
  res.render('productos', await { todosLosProductos })
  console.log(todosLosProductos)
})

router.post('/', async (req, res) => {
  const { producto, precio, imagen } = req.body
  const newProduct = new Product({
    producto,
    precio,
    imagen
  })
  await newProduct.save()
  res.send({ 'Producto agregado': newProduct })
})

router.post('/addCart', async (req, res) => {
  const { id } = req.body
  const producto = await Product.findById(id)
  const newCarrito = new Carrito({
    producto: producto.producto,
    precio: producto.precio,
    imagen: producto.imagen
  })
  await newCarrito.save()
  res.redirect('/productos/carrito')
})

router.get('/carrito', async (req, res) => {
  let productosCarrito = await Carrito.find()
  res.render('carrito', { productosCarrito })
  console.log(productosCarrito)
})

router.post('/comprar', async (req, res) => {
  let productosCarrito = await Carrito.find()
  res.render('compra')
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
          user: 'nelladelugo2@gmail.com',
          pass: 'usexwsqobxltwaxt'
        }
      })
      let mailOptionsForUser = {
        from: `Compra de ${email}`,
        to: user.email,
        subject: 'Compra realizada con exito',
        html: `<h1>Articulos comprados</h1>
        ${productosCarrito.map(producto => `
        <p>Producto: ${producto.producto}</p>
        <p>Precio: ${producto.precio}</p>
        <p>Id: ${producto._id}</p>
        
        `).join('')}
      `
      }

      let mailOptionsForAdmin = {
        from: `Compra de ${user.name}`,
        to: `${email}`,
        subject: 'Nueva compra',
        html: `<h1>Articulos comprados</h1>
        ${productosCarrito.map(producto => `
        <p>Producto: ${producto.producto}</p>
        <p>Precio: ${producto.precio}</p>
        <p>Id: ${producto._id}</p>
        
        `).join('')}
        Usuario : ${user.name}
        Email : ${user.email}
        Telefono : ${user.telefono}
        Direccion : ${user.direccion}
      `
      }

      transporter.sendMail(mailOptionsForUser, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Email sent: ' + info.response)
        }
      }
      )
      transporter.sendMail(mailOptionsForAdmin, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Email sent: ' + info.response)
        }
      }
      )
    }
  })
})

module.exports = router