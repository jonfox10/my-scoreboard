const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:4100/' }))
  app.use(proxy('/auth', { target: 'http://localhost:4100/' }))
<<<<<<< HEAD
}
=======
}
>>>>>>> 6d83a8e7ed3d4d4afcdb06ed6a2ce778de462748
