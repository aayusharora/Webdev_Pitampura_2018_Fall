// Create Express Package
const express = require('express');
// Making app from express
const app = express();
// @param: app
// It is going to port express app on the node server
const http = require('http').Server(app);
// Creating socket array
let users = [];
// Hosting Static files
app.use('/',express.static('public'));
// Requiring Socket.io
const sock = require('socket.io');
// Porting socket.io on Node server
// @param: http : the node server with ported express app
const io = sock(http);
// Make connection here
// @param: socket: Is a JS object containing the important unique id 
io.on('connection', function(socket){
    console.log(socket.id);
   // Listening to the message custom event
   // @param: data=> data which client is sending
   socket.on('message', function(data){
        io.emit('chatmsg',data);
        //socket.broadcast.emit('chatmsg', data);
   })

   socket.on('user', function(username){
      users.push({'username': username, 'id': socket.id});
      io.emit('connectedUsers', username);
   })
   
   socket.on('disconnect', function(user){
       let index = users.indexOf(user.id);
       users.splice(index,1);
       io.emit('userDisconnect', users);
   })

})


// Node server will be listening on 3000
http.listen(3000, function(){
    console.log('Listening on port 3000');
});