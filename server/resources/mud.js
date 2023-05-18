const multer = require("multer")
const upload = multer({ dest: "public/uploads/"})
module.exports = (app, connection, protectedRoute) => {
    app.post('/api/muds', upload.single('source'), (req, res)=>{
        const i = req.body
        const file = req.file

        connection.query(`INSERT INTO muds (title, description, tag_id, source, user_id, type, likes, comments) VALUES (?,?,?,?,?,?,?,?);--`,[i.title, i.description, 0, `uploads/${file.filename}`, i.user_id,'mud', 0, 0], (err, result) => {
        if (err) {
        return res.json({faild: err, log: file})

        }

        return res.json({ok: true})
        })

    })
    app.post('/api/muds/text',upload.single(''), (req, res)=>{
        const i = req.body
        const file = req.file

        connection.query(`INSERT INTO muds (title, description, tag_id, source, user_id, type, likes, comments) VALUES (?,?,?,?,?,?,?,?);--`,[i.title, i.description, 0,'mud', i.user_id,'mud', 0, 0], (err, result) => {
            if (err) {
                return res.json({faild: err})

            }

            return res.json({ok: true})
        })

    })
    app.get('/api/muds/user/:id', (req, res)=>{
        const id = req.params.id
        connection.query("SELECT * from muds WHERE user_id = ? ORDER BY mud_id DESC;--",[id], (err, result) => {
            if (err) throw err
            
            return res.json(result)
        })
    })
    app.get('/api/mud/:id', (req, res)=>{
        const id = req.params.id
        connection.query("SELECT * from muds  WHERE mud_id = ?;--",[id], (err, result) => {
            if (err) throw err
            
            return res.json(result[0])
        })
    })
    app.get('/api/muds', (req, res)=>{
        connection.query("SELECT * from muds ORDER BY mud_id DESC;--", (err, result) => {
            if (err) throw err
            
            return res.json(result)
        })
    })
    app.get('/api/muds/likes/:userId',(req, res) => {
        const user_id = req.params.userId
        connection.query(`SELECT mud_id from user_likes WHERE user_id=?;--`,[user_id], (err, result) => {
            if (err) throw err
            var response = []
            for (const element of result) {
                response.push(element.mud_id)
            }
            return res.json(response)
        })

    })
     //like up
     app.post('/api/muds/like/:mudId/:userId', (req, res) =>{
        const mud_id = req.params.mudId
        const user_id = req.params.userId

        connection.query(`INSERT INTO user_likes (user_id, mud_id) VALUES (?,?);`,[user_id, mud_id], (err, result) => {
            if (err) {
                return res.json({faild: err})

            }
            connection.query(`UPDATE muds SET likes = likes + 1 WHERE mud_id = ?;--`,[mud_id], (err, result) => {
                if (err) {
                    return res.json({faild: err})
    
                }
    
                return res.json({ok: true})
            })
        })

    })
    //like down
    app.post('/api/muds/likedown/:mudId/:userId', (req, res) =>{
        const mud_id = req.params.mudId
        const user_id = req.params.userId

        connection.query(`DELETE FROM user_likes WHERE user_id = ? AND mud_id = ?;--`,[user_id, mud_id], (err, result) => {
            if (err) {
                return res.json({faild: err})

            }
            connection.query(`UPDATE muds SET likes = likes - 1 WHERE mud_id = ?;--`,[mud_id], (err, result) => {
                if (err) throw err
    
                return res.json({ok: true})
            })
        })

    })
    app.get('/api/muds/likes/:userId',(req, res) => {
        const user_id = req.params.userId
        connection.query(`SELECT mud_id from user_likes WHERE user_id=?;--`,[user_id], (err, result) => {
            if (err) throw err
            var response = []
            for (const element of result) {
                response.push(element.mud_id)
            }
            return res.json(response)
        })

    })
    app.get('/api/muds/:Id/comments', (req, res) => {
        connection.query(`SELECT comments.comment_id, comments.user_id, comments.mud_id, comments.comment, users.username, users.email from comments LEFT JOIN users ON comments.user_id = users.user_id WHERE comments.mud_id=? ;--`,[req.params.Id], (err, result)=>{
            if(err) throw err
            return res.json(result)
        })
    })
    app.post('/api/muds/:Id/comments', (req, res) => {
        const mudId = req.params.Id
        const userId = req.body.userId
        const comment = req.body.comment
        connection.query(`INSERT INTO comments (user_id, mud_id, comment) VALUES (?,?,?);--`,[userId, mudId, comment], (err, result) => {
            if (err) throw err
            connection.query(`UPDATE muds SET comments = comments + 1 WHERE mud_id = ?;--`,[mudId], (err, result) => {
                if (err) throw err
    
                return res.json({ok: true})
            })
        })
    })

}