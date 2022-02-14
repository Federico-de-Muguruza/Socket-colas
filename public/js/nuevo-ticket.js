const newTicket = document.querySelector('#lblNuevoTicket');
const createBtn = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    createBtn.disabled = false;
});

socket.on('disconnect', () => {
    createBtn.disabled = true;
});

socket.on('last-ticket', (lastTicket) => {
    newTicket.innerHTML = 'Ticket: ' + lastTicket;
})

createBtn.addEventListener( 'click', () => {
    
    socket.emit('next-ticket', null, (ticket) => {
        newTicket.innerHTML = ticket;
    });

});