const express = require('express')
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3333

http.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})

app.use( express.static( 'public' ))

io.on('connection', (socket)=>{
    console.log(`Socket ID: ${socket.id}`)

    //From WEB to Premiere
    socket.on("Request_Sequences", ()=>{
        io.emit('Request_Sequences_Ppro')
    })
    socket.on("Render_Seq", (data)=>{
        io.emit('Render_Seq_Ppro', data)
    })

    // From Premier to WEB
    socket.on("Sequence_List", (data)=>{
        io.emit('Update_Sequence_List', data)
    })
})