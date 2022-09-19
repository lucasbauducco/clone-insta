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
app.use(express.static('public')) // hablilitar capeta como publica
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'instagram1',
    password : 'instagram',
    database : 'instaclone'
})

const protectedRoute = (req, res, next) => {
    const token = req.headers["authorization"]
    if(!token)
        return res.status(401).json({ error: "Unauthorized"})

    jwt.verify(token, 'd47b7e7525c7c01f94c053c513e6b22eb5e256b310346c31e474f1b078811b6a', (err, decoded) => {
        if(err)
            return res.status(401).json({ error: "Unauthorized"})
        req.decoded = decoded
        next()
    })
}

require('./resources/users')(app, connection, protectedRoute)
require('./resources/post')(app, connection, protectedRoute)

app.listen(4000, () => {
    console.log("El servidor esta corriendo en el puerto 4000")
})