const multer = require("multer")
const upload = multer({ dest: "public/uploads/"})
module.exports = (app, connection, protectedRoute) => {
    app.post('/api/muds', upload.single('source'), (req, res)=>{
        const i = req.body
        const file = req.file
        connection.query(`INSERT INTO muds (text, tag, source, user_id, type) VALUES (?,?,?,?,?);--`,[i.text, i.tags, `uploads/${file.filename}`, i.user_id,'mud'], (err, result) => {
            if (err) throw err

            return res.json({ok: true})
        })
        
    })
    app.get('/api/muds', (req, res)=>{
        connection.query("SELECT * from muds ORDER BY mud_id DESC;--", (err, result) => {
            if (err) throw err
            
            return res.json(result)
        })
    })

}