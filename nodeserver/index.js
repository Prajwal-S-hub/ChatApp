// Entry point for node server which handles socket functions
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  }); //Port 8000

const users = {};
io.on('connection', socket => {   //Listens for event connection
    socket.on('new-user-joined', name => {  // socket.on is for that particular socket after connecting 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //emit the user-joined event to others who are already connected

    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left_chat', {name: users[socket.id]});
        delete users[socket.id];
    });

})