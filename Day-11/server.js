import app from "./src/app.js"
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
    // options
});

io.on("connection", (socket) => {
    console.log("connection is created");
    socket.on("message", (msg) => {
        console.log("user fire a msg")
    })
});

httpServer.listen(3000, () => {
    console.log("server is running on port 3000")
})