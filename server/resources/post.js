const multer = require("multer")
const upload = multer({ dest: "public/uploads/"})
module.exports = (app, connection, protectedRoute) => {

    app.get('/api/posts', (req, res)=>{
        connection.query("SELECT * from post where type = 'public';--", (err, result) => {
            if (err) throw err
            
            return res.json(result)
        })
    })
    app.get('/api/posts/:id', (req, res)=>{
        const id = req.params.id
        connection.query("SELECT * from post WHERE post_id = ?;--",[id], (err, result) => {
            if (err) throw err
            
            return res.json(result[0])
        })
    })
    app.post('/api/posts', upload.single('source'), (req, res)=>{
        const i = req.body
        const file = req.file
        connection.query(`INSERT INTO post (title,tags, description, source, user_id, type) VALUES (?,?,?,?,?,?);--`,[i.title, i.tags, i.description, `uploads/${file.filename}`, i.user_id,'private'], (err, result) => {
            if (err) throw err

            return res.json({ok: true})
        })
        
    })
    app.post('/api/posts/like/:postId/:userId', (req, res) =>{
        const post_id = req.params.postId
        const user_id = req.params.userId

        connection.query(`INSERT INTO user_likes (user_id, post_id) VALUES (?,?);--`,[user_id, post_id], (err, result) => {
            if (err) throw err
            connection.query(`UPDATE post SET likes = likes + 1 WHERE post_id = ?;--`,[post_id], (err, result) => {
                if (err) throw err
    
                return res.json({ok: true})
            })
        })

    })
    app.get('/api/posts/likes/:userId',(req, res) => {
        const user_id = req.params.userId
        connection.query(`SELECT post_id from user_likes WHERE user_id=?;--`,[user_id], (err, result) => {
            if (err) throw err
            var response = []
            for (const element of result) {
                response.push(element.post_id)
            }
            return res.json(response)
        })

    })
    app.get('/api/posts/:Id/comments', (req, res) => {
        connection.query(`SELECT comments.comment_id, comments.user_id, comments.post_id, comments.comment, users.username, users.email from comments LEFT JOIN users ON comments.user_id = users.user_id WHERE comments.post_id=? ;--`,[req.params.Id], (err, result)=>{
            if(err) throw err
            return res.json(result)
        })
    })
    app.post('/api/posts/:Id/comments', (req, res) => {
        const postId = req.params.Id
        const userId = req.body.userId
        const comment = req.body.comment
        connection.query(`INSERT INTO comments (user_id, post_id, comment) VALUES (?,?,?);--`,[userId, postId, comment], (err, result) => {
            if (err) throw err
    
            return res.json({ok: true})
        })
    })
}
