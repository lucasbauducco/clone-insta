const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
app.use(cors())
app.use(express.json())
//token
/*const signToken = userData =>{
    jwt.sign(userData, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a',{algorithm: 'RS256'}, (err, token) =>{
        if(err) throw err
        return token
    })
}*/
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'instagram1',
    password : 'instagram',
    database : 'instaclone'
})
app.post('/api/users/login', (req, res) =>{
    var userData = {
        email: req.body.email,
        password: req.body.password
    }
    bcrypt.hash(userData.password, 10, (err, hash) => {
        connection.query("SELECT email, password from users where email = '"+req.body.email+"'",(err, result) =>{
            if(err) throw err
            var userData = {
                email: req.body.email
            }
            jwt.sign(userData, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a',{expiresIn: 1444}, (err, token) =>{
                if(err) throw err
                res.json({ token: token })
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
            jwt.sign(userData, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a',{expiresIn: 1444}, (err, token) =>{
                if(err) throw err
                res.json({ token: token })
            })

        })
    })
})

app.listen(4000, () => {
    console.log("El servidor esta corriendo en el puerto 4000")
})