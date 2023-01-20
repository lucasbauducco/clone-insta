const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (app, connection, protectedRoute) => {

  app.get('/api/users/:id', (req, res) => {
    connection.query('SELECT user_id, username, email from users WHERE user_id =?;--',[req.params.id], (err, result) => {
      if(err) throw err
  
      return res.json(result[0])
    })
  })

  app.post('/api/users/login', (req, res) => {

    connection.query('SELECT user_id, email, password, username from users where email = ?;--',[req.body.email],(err, result) =>{
      if(err) throw err
  
      if(!result[0])
        return res.json({ error: "Usuario no encontrado"})
      const match = bcrypt.compare(req.body.password, result[0].password);
      if(!match)
          return res.json({ error: "Contraseña incorrecta"+req.body.password })
        
      var userData = {
        id: result[0].user_id,
        username: result[0].username
      }
      jwt.sign(userData, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a', { }, (err, token) => {
        if(err) throw err
        return res.json({ token: token, id: userData.id, username: userData.username })
      })
    })
  })
  
  app.post('/api/users/register', (req, res) => {
  
    bcrypt.hash(req.body.password, 10, (err, password) => {
        connection.query('INSERT INTO users (username, email, password) VALUES (?,?,?);--',[req.body.username, req.body.email, password], (err, result) => {
          if (err) throw err
  
          var userData = {
            email: req.body.email
          }
          console.log(userData)
          jwt.sign(userData, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a', { }, (err, token) => {
            if(err) throw err
            res.json({ token: token, id: result.insertId, username: req.body.username })
          })  
  
      })
    })
  })
  
  /*app.get('/api/users/profile', protectedRoute, (req, res) => {
    res.json({
      email: "lucasbauducco@hotmail.com"
    })
  })*/
}