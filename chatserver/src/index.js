import express from 'express';
import http from 'http';
import { Server } from "socket.io";

const app = express();

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, {    cors: {
    origin: '*'
}});

app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`)
})

socketServer.on('connection', (socket) => {
    console.log('Connection establised');

    socket.on('chat_message', (from, msg) => {
        const customMessage = `Your message ${from}`;
        console.log(customMessage)
        socketServer.emit('chat_mesage', customMessage); 
    });


    socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    
      socket.on('on_new_message_send', (msg) => {
        console.log(msg)
        socketServer.emit('on_new_message_receive', msg);
      });
})


const PORT = 6500
httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);

})