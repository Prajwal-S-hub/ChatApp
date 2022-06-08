const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');  //where u want to display the message

const append_msg = (message, position) =>  // create a div and send that message
{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position); //left or right
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append_msg(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

//const msg_name = prompt("Enter your name to join");
socket.emit('new-user-joined', msg_name);

socket.on('user-joined', name => {
    append_msg(`${name} joined the chat`, 'left');
});

socket.on('receive', data => {
    append_msg(`${data.name}: ${data.message}`, 'left');
});

socket.on('left_chat', user => {
    append_msg(`${user.name} left the chat`, 'left');
})
