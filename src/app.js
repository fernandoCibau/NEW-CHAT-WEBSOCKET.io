
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer( app );
const io = new Server( server );

app.use( express.static( "src/public" ) );

const allMessage = [];
io.on( "connection", socket => {
    console.log("NEW USER CONNECTED : ", socket.id );


    //----------------------------------------------------------------
    socket.on( "identification", data => {
        // console.log( data );
        socket.broadcast.emit("welcome", data );
        socket.emit( "allMessage", allMessage );
    })
    //----------------------------------------------------------------
    socket.on( "form_message", data => {
        allMessage.unshift( data );
        io.emit( "allMessage", allMessage );
    });

    //----------------------------------------------------------------


})


const PORT = 8080;
server.listen( PORT, () => {
    console.log(    `LISTENING A PORT : ${PORT}` );
})
