
module.exports = (app, connection, protectedRoute) => {

    app.get('/api/posts', (req, res)=>{
        connection.query("SELECT * from post", (err, result) => {
            if (err) throw err
            
            return res.json(result)
        })
    })
}