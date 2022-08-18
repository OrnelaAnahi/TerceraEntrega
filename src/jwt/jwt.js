const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'miKey'

function generarToken(payload) {
  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1h' });
}
function auth(req, res, next) {
  const token = req.header['Autorization'] || req.header['authorization'];
  if (token) {
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Token no valido'
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      error: 'No hay token'
    });
  }
}
module.exports = { generarToken, auth };