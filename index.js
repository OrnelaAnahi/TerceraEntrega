const express = require('express')
require('./src/db/dbMongo.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
require('./src/passport/local.js')
// const cluster = require('cluster')
// const numCPUs = require('os').cpus().length

const logueo = require('./src/routes/logueo.js')
const agregarProducto = require('./src/routes/agregarProducto.js')
const app = express()

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`)
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork()
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`)
//     cluster.fork()
//   })
// } else {
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'secret',
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 600000
  },
  store: MongoStore.create({ mongoUrl: "mongodb+srv://ornelaAnahi:1221322343@cluster0.unl79bb.mongodb.net/sessionMongo?retryWrites=true&w=majority" })
}))
// function isAuth(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/login')
// }
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use('/productos', agregarProducto)
app.use('/', logueo)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
//}

