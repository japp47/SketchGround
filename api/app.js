const express = require("express")
const socket = require("socket.io")

const app = express();
// app.use(express.static("public"))

let PORT = process.env.PORT || 3000;

let server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

let io = socket(server);
io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data)
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data)
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data)
    })
})
