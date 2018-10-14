// Emitting connection event
$(document).ready(function(){

    let btn = $('#btn');
    let input = $('#inp');
    let result = $('#result');
    let usersList = $('#usersList');

    let username = window.prompt('Enter your username');
    
    var socket = io();
    emitUser(username);
    btn.click(function(){
        let val = input.val();
        socket.emit('message', val);
    });
    
    socket.on('chatmsg', function(data){
        result.append(`<li>${data}</li>`);
    })
    
    socket.on('connectedUsers', function(user){
        usersList.append(`<li>${user}</li>`)
    });

    socket.on('userDisconnect', function(data){
         usersList.text(' ');
         data.forEach((i)=>{
              usersList.append(`<li>${i.username}</li>`)
         })
    })  

    function emitUser(username) {
        socket.emit('user', username)
    }
});

