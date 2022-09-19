const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = (app, connection, protectedRoute) => {
    app.post('/api/users/login', (req, res) =>{
   
        connection.query("SELECT email, password from users where email = '"+req.body.email+"'",(err, result) =>{
            if(err) throw err
            if(!result[0])
                return res.json({ error: "Usuario no encontrado"})
            bcrypt.compare(req.body.password, result[0].password, (err, ok) => {
                    if(!ok)
                        return res.json({error: "Contraseña incorrecta"})
                
                var userData = {
                    id: result[0].user_id
                }
                jwt.sign(userData, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a',{}, (err, token) =>{
                    if(err) throw err
                    return res.json({ token: token })
                })
            })
        })
})
app.post('/api/users/register', (req, res) =>{
    bcrypt.hash(req.body.password, 10, (err, password) => {
        connection.query("INSERT INTO users (email, password) VALUES ('"+req.body.email+"','"+password+"')", result => {
            
            var userData = {
                email: req.body.email
            }
            jwt.sign(userData, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a',{}, (err, token) =>{
                if(err) throw err
                res.json({ token: token })
            })

        })
    })
})
app.get('/api/users/profile', protectedRoute, (req, res) => {
    res.json({
        email : "Hola@asdasdasd.com"
    })
})
}